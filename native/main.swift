import Cocoa
import WebKit

class AppDelegate: NSObject, NSApplicationDelegate, WKNavigationDelegate, WKUIDelegate {
    var window: NSWindow!
    var webView: WKWebView!

    func applicationDidFinishLaunching(_ aNotification: Notification) {
        NSApp.setActivationPolicy(.regular)

        let screenRect = NSScreen.main?.visibleFrame ?? NSRect(x: 0, y: 0, width: 1440, height: 900)
        let windowWidth: CGFloat = 1440
        let windowHeight: CGFloat = 900
        let windowRect = NSRect(
            x: screenRect.midX - windowWidth / 2,
            y: screenRect.midY - windowHeight / 2,
            width: windowWidth,
            height: windowHeight
        )

        window = NSWindow(
            contentRect: windowRect,
            styleMask: [.titled, .closable, .miniaturizable, .resizable],
            backing: .buffered,
            defer: false
        )
        window.title = "EventFlow — College Event Management & Participation System"
        window.minSize = NSSize(width: 1080, height: 720)
        window.center()

        let config = WKWebViewConfiguration()
        let prefs = WKWebpagePreferences()
        prefs.allowsContentJavaScript = true
        config.defaultWebpagePreferences = prefs
        config.preferences.setValue(true, forKey: "allowFileAccessFromFileURLs")
        config.setValue(true, forKey: "allowUniversalAccessFromFileURLs")

        // Enable localStorage persistence in standard location
        let dataStore = WKWebsiteDataStore.default()
        config.websiteDataStore = dataStore

        webView = WKWebView(frame: window.contentView!.bounds, configuration: config)
        webView.autoresizingMask = [.width, .height]
        webView.navigationDelegate = self
        webView.uiDelegate = self

        window.contentView?.addSubview(webView)
        window.makeKeyAndOrderFront(nil)
        NSApp.activate(ignoringOtherApps: true)

        setupMenu()
        loadApp()
    }

    func setupMenu() {
        let mainMenu = NSMenu()
        let appMenuItem = NSMenuItem()
        mainMenu.addItem(appMenuItem)
        let appMenu = NSMenu()
        let quitTitle = "Quit EventFlow"
        let quitMenuItem = NSMenuItem(title: quitTitle, action: #selector(NSApplication.terminate(_:)), keyEquivalent: "q")
        appMenu.addItem(quitMenuItem)
        appMenuItem.submenu = appMenu
        NSApp.mainMenu = mainMenu
    }

    func loadApp() {
        var distURL: URL?

        if let resourceURL = Bundle.main.resourceURL {
            let bundleDist = resourceURL.appendingPathComponent("dist")
            if FileManager.default.fileExists(atPath: bundleDist.appendingPathComponent("index.html").path) {
                distURL = bundleDist
            }
        }

        if distURL == nil {
            let localDist = URL(fileURLWithPath: FileManager.default.currentDirectoryPath).appendingPathComponent("dist")
            if FileManager.default.fileExists(atPath: localDist.appendingPathComponent("index.html").path) {
                distURL = localDist
            }
        }

        if let dist = distURL {
            let indexURL = dist.appendingPathComponent("index.html")
            webView.loadFileURL(indexURL, allowingReadAccessTo: dist)
        }
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        return true
    }

    // Handle target="_blank" links gracefully
    func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration, for navigationAction: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
        if navigationAction.targetFrame == nil {
            if let url = navigationAction.request.url {
                NSWorkspace.shared.open(url)
            }
        }
        return nil
    }
}

let app = NSApplication.shared
let delegate = AppDelegate()
app.delegate = delegate
app.run()
