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
        if let url = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "dist") {
            nsView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
        }
    }
}
