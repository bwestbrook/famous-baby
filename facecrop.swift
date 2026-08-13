// facecrop.swift — make a face-only copy of every portrait, for the collage.
//
//   swiftc -O facecrop.swift -o facecrop
//   ./facecrop photos photos/faces [maxEdge] [quality]
//
// The collage fits a whole portrait inside a country's outline, so a
// head-and-shoulders shot reads well and a full-length one leaves the face a
// few pixels tall. This writes a second, tightly cropped copy of each photo
// for the map to use. The originals stay exactly where they are — the person
// card wants the whole picture, and cropping is lossy in the sense that
// matters: you can't get the room back.
//
// Face detection is Vision's, which ships with macOS, so there's no pip or npm
// dependency to install. Portraits with no detectable face (paintings, statues,
// engravings — Mansa Musa, Nzinga Mbande, Omar Khayyám) fall back to a crop of
// the upper-middle, which is where the subject of a portrait almost always is.

import Foundation
import CoreImage
import ImageIO
import Vision
import UniformTypeIdentifiers

// How much wider than the detected face box to cut. Vision returns roughly
// brow-to-chin; opening up to 2.1x takes in hair, ears and a little shoulder,
// which is what makes it read as a portrait rather than a passport scan.
let FACE_SCALE: CGFloat = 2.1
// Sit the face a little above the middle, the way a portrait is usually
// composed — so the crop reaches further down than up.
let FACE_DROP: CGFloat = 0.10

let args = CommandLine.arguments
guard args.count >= 3 else {
    FileHandle.standardError.write("usage: facecrop <inDir> <outDir> [maxEdge] [quality]\n".data(using: .utf8)!)
    exit(2)
}
let inDir = URL(fileURLWithPath: args[1])
let outDir = URL(fileURLWithPath: args[2])
let maxEdge = CGFloat(args.count > 3 ? Int(args[3]) ?? 512 : 512)
let quality = args.count > 4 ? (Double(args[4]) ?? 0.72) : 0.72

try? FileManager.default.createDirectory(at: outDir, withIntermediateDirectories: true)

let ciContext = CIContext(options: [.useSoftwareRenderer: false])

func loadImage(_ url: URL) -> CGImage? {
    guard let src = CGImageSourceCreateWithURL(url as CFURL, nil) else { return nil }
    return CGImageSourceCreateImageAtIndex(src, 0, nil)
}

/// Largest face in the image, in pixel coordinates with the origin top-left.
func largestFace(_ image: CGImage) -> CGRect? {
    let request = VNDetectFaceRectanglesRequest()
    let handler = VNImageRequestHandler(cgImage: image, options: [:])
    do { try handler.perform([request]) } catch { return nil }
    guard let faces = request.results, !faces.isEmpty else { return nil }
    let w = CGFloat(image.width), h = CGFloat(image.height)
    // Vision's boundingBox is normalised with the origin at the bottom-left.
    let boxes = faces.map { f -> CGRect in
        let b = f.boundingBox
        return CGRect(x: b.minX * w, y: (1 - b.maxY) * h, width: b.width * w, height: b.height * h)
    }
    return boxes.max { $0.width * $0.height < $1.width * $1.height }
}

/// A square crop around the face, clamped to stay inside the image.
func cropRect(face: CGRect?, imageW: CGFloat, imageH: CGFloat) -> CGRect {
    var side: CGFloat
    var cx: CGFloat
    var cy: CGFloat
    if let f = face {
        side = max(f.width, f.height) * FACE_SCALE
        cx = f.midX
        cy = f.midY + side * FACE_DROP
    } else {
        // No face found: take the upper-middle, where a portrait's subject is.
        side = min(imageW, imageH * 0.82)
        cx = imageW / 2
        cy = imageH * 0.40
    }
    side = min(side, min(imageW, imageH))
    var x = cx - side / 2
    var y = cy - side / 2
    x = max(0, min(imageW - side, x))
    y = max(0, min(imageH - side, y))
    return CGRect(x: x, y: y, width: side, height: side)
}

func writeJPEG(_ image: CGImage, to url: URL, quality: Double) -> Bool {
    guard let dest = CGImageDestinationCreateWithURL(
        url as CFURL, UTType.jpeg.identifier as CFString, 1, nil
    ) else { return false }
    CGImageDestinationAddImage(dest, image, [kCGImageDestinationLossyCompressionQuality: quality] as CFDictionary)
    return CGImageDestinationFinalize(dest)
}

let files = ((try? FileManager.default.contentsOfDirectory(atPath: inDir.path)) ?? [])
    .filter { $0.hasSuffix(".jpg") }
    .sorted()

var detected = 0, guessed = 0, failed = 0

for name in files {
    let src = inDir.appendingPathComponent(name)
    let dst = outDir.appendingPathComponent(name)
    guard let image = loadImage(src) else {
        FileHandle.standardError.write("  unreadable: \(name)\n".data(using: .utf8)!)
        failed += 1
        continue
    }
    let w = CGFloat(image.width), h = CGFloat(image.height)
    let face = largestFace(image)
    if face != nil { detected += 1 } else { guessed += 1 }

    let rect = cropRect(face: face, imageW: w, imageH: h)
    guard let cropped = image.cropping(to: rect) else { failed += 1; continue }

    // Scale down to the edge the globe actually draws at.
    let scale = min(1.0, maxEdge / CGFloat(cropped.width))
    var output = cropped
    if scale < 1.0 {
        let ci = CIImage(cgImage: cropped).transformed(by: CGAffineTransform(scaleX: scale, y: scale))
        if let rendered = ciContext.createCGImage(ci, from: ci.extent) { output = rendered }
    }
    if !writeJPEG(output, to: dst, quality: quality) { failed += 1 }
}

print("faces cropped: \(detected) detected, \(guessed) fell back to upper-middle, \(failed) failed")
