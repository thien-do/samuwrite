//
//  ContentView.swift
//  SamuwriteNative
//
//  Created by Khoa Le on 12/06/2022.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            WebView()
                .frame(maxWidth: .infinity, maxHeight: .infinity)
        }
        .edgesIgnoringSafeArea(.top)

    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
