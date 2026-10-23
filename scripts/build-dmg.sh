#!/bin/bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$DIR"

echo "==> 1. Building Vite frontend..."
npm run build

echo "==> 2. Compiling native macOS binary with swiftc..."
mkdir -p build/bin
swiftc -O -framework Cocoa -framework WebKit \
  -target arm64-apple-macos11.0 \
  -o build/bin/EventFlow \
  native/main.swift

echo "==> 3. Creating EventFlow.app bundle..."
APP_DIR="build/EventFlow.app"
rm -rf "$APP_DIR"
mkdir -p "$APP_DIR/Contents/MacOS"
mkdir -p "$APP_DIR/Contents/Resources"

cp build/bin/EventFlow "$APP_DIR/Contents/MacOS/EventFlow"
chmod +x "$APP_DIR/Contents/MacOS/EventFlow"

cp -R dist "$APP_DIR/Contents/Resources/"

cat << 'EOF' > "$APP_DIR/Contents/Info.plist"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleExecutable</key>
    <string>EventFlow</string>
    <key>CFBundleIdentifier</key>
    <string>com.college.eventflow</string>
    <key>CFBundleName</key>
    <string>EventFlow</string>
    <key>CFBundleDisplayName</key>
    <string>EventFlow</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0.0</string>
    <key>CFBundleVersion</key>
    <string>1.0.0</string>
    <key>LSMinimumSystemVersion</key>
    <string>11.0</string>
    <key>NSHighResolutionCapable</key>
    <true/>
</dict>
</plist>
EOF

echo "==> 4. Preparing DMG folder with Applications symlink..."
DMG_STAGE="build/dmg-staging"
rm -rf "$DMG_STAGE"
mkdir -p "$DMG_STAGE"
cp -R "$APP_DIR" "$DMG_STAGE/"
ln -s /Applications "$DMG_STAGE/Applications"

echo "==> 5. Creating compressed DMG..."
mkdir -p release
FINAL_DMG="release/EventFlow-macOS.dmg"
rm -f "$FINAL_DMG"

hdiutil create -srcfolder "$DMG_STAGE" \
  -volname "EventFlow" \
  -format UDBZ \
  -ov \
  "$FINAL_DMG"

echo "==> Finished building DMG!"
ls -lh "$FINAL_DMG"
