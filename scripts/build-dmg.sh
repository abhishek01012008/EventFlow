#!/bin/bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$DIR"

echo "==> 1. Building Vite frontend..."
npm run build

echo "==> 2. Compiling Universal Binary (Apple Silicon arm64 + Intel x86_64)..."
mkdir -p build/bin

# Compile for Apple Silicon (M1/M2/M3/M4)
swiftc -O -framework Cocoa -framework WebKit \
  -target arm64-apple-macos11.0 \
  -o build/bin/EventFlow_arm64 \
  native/main.swift

# Compile for Intel Macs (x86_64)
swiftc -O -framework Cocoa -framework WebKit \
  -target x86_64-apple-macos11.0 \
  -o build/bin/EventFlow_x86 \
  native/main.swift

# Create Universal Fat Binary
lipo -create -output build/bin/EventFlow build/bin/EventFlow_arm64 build/bin/EventFlow_x86
lipo -info build/bin/EventFlow

echo "==> 3. Creating EventFlow.app bundle..."
APP_DIR="build/EventFlow.app"
rm -rf "$APP_DIR"
mkdir -p "$APP_DIR/Contents/MacOS"
mkdir -p "$APP_DIR/Contents/Resources"

cp build/bin/EventFlow "$APP_DIR/Contents/MacOS/EventFlow"
chmod +x "$APP_DIR/Contents/MacOS/EventFlow"

# Copy App Icon if available
if [ -f "native/AppIcon.icns" ]; then
  cp "native/AppIcon.icns" "$APP_DIR/Contents/Resources/AppIcon.icns"
fi

# Copy built frontend assets
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
    <key>CFBundleIconFile</key>
    <string>AppIcon</string>
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

echo "==> 4. Applying ad-hoc codesign to prevent 'app damaged' errors..."
codesign --force --deep --sign - "$APP_DIR"

echo "==> 5. Preparing DMG folder with Applications symlink..."
DMG_STAGE="build/dmg-staging"
rm -rf "$DMG_STAGE"
mkdir -p "$DMG_STAGE"
cp -R "$APP_DIR" "$DMG_STAGE/"
ln -s /Applications "$DMG_STAGE/Applications"

echo "==> 6. Creating compressed DMG..."
mkdir -p release
FINAL_DMG="release/EventFlow-macOS.dmg"
rm -f "$FINAL_DMG"

hdiutil create -srcfolder "$DMG_STAGE" \
  -volname "EventFlow" \
  -format UDBZ \
  -ov \
  "$FINAL_DMG"

echo "==> Finished building Universal DMG!"
ls -lh "$FINAL_DMG"
