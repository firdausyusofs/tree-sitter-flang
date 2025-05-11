import XCTest
import SwiftTreeSitter
import TreeSitterFLang

final class TreeSitterFLangTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_flang())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading FLang grammar")
    }
}
