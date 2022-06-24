//
//  SamuwriteNativeApp.swift
//  SamuwriteNative
//
//  Created by Khoa Le on 12/06/2022.
//

import SwiftUI

@main
struct SamuwriteNativeApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
                .frame(
                    minWidth: 300,
                    maxWidth: .infinity,
                    minHeight: 300,
                    maxHeight: .infinity)
        }
        .windowStyle(.hiddenTitleBar)
        .windowToolbarStyle(.automatic)
    }
}
