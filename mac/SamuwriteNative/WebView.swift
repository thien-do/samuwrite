//
//  WebViewController.swift
//  SamuwriteNative
//
//  Created by Khoa Le on 12/06/2022.
//

import WebKit
import SwiftUI
import Combine
import Cocoa

struct WebView: NSViewRepresentable {
    var environment: Environment
    
    func makeNSView(context: Context) -> WKWebView {
        let preferences = WKPreferences()
        
        let configuration = WKWebViewConfiguration()
        configuration.defaultWebpagePreferences.allowsContentJavaScript = true
        configuration.preferences.setValue(true, forKey: "allowFileAccessFromFileURLs")
        
        let webView = WKWebView(frame: .zero, configuration: configuration)
        webView.allowsBackForwardNavigationGestures = true
        return webView
    }
    
    func updateNSView(_ nsView: WKWebView, context: Context) {
        switch environment {
        case .prod:
            if let url = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "dist") {
                nsView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
            }
        case .webDebug:
            if let url = URL(string: "https://samuwrite.com") {
                nsView.load(URLRequest(url: url))
            }
        }
    }
}

enum Environment {
    case prod
    case webDebug
}
