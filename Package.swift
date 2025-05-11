// swift-tools-version:5.3
import PackageDescription

let package = Package(
    name: "TreeSitterFLang",
    products: [
        .library(name: "TreeSitterFLang", targets: ["TreeSitterFLang"]),
    ],
    dependencies: [
        .package(url: "https://github.com/ChimeHQ/SwiftTreeSitter", from: "0.8.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterFLang",
            dependencies: [],
            path: ".",
            sources: [
                "src/parser.c",
                // NOTE: if your language has an external scanner, add it here.
            ],
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterFLangTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterFLang",
            ],
            path: "bindings/swift/TreeSitterFLangTests"
        )
    ],
    cLanguageStandard: .c11
)
