# How to build [Dilithium](https://github.com/pq-crystals/dilithium) source code:

## iOS

1. Clone https://github.com/pq-crystals/dilithium.
2. Replace copy current folder to cloned repository.
3. Build project for iOS device:

```bash
cmake -B build -G Xcode -DCMAKE_TOOLCHAIN_FILE=../ios.toolchain.cmake -DPLATFORM=OS64
cmake --build build --config Release
```

- Copy static library:

```bash
mkdir -p lib/device && cp build/ref/Release-iphoneos/libdilithium5aes_ref.a lib/device
```

4. Delete build folder: `rm -rf build`
5. Build project for iOS simulator:

```bash
cmake -B build -G Xcode -DCMAKE_TOOLCHAIN_FILE=../ios.toolchain.cmake -DPLATFORM=SIMULATORARM64
cmake --build build --config Release
```

- Copy static library:

```bash
mkdir -p lib/simulator && cp build/ref/Release-iphonesimulator/libdilithium5aes_ref.a lib/simulator
```

6. Create [xcframework bundle](https://developer.apple.com/documentation/xcode/creating-a-multi-platform-binary-framework-bundle):

```bash
xcodebuild -create-xcframework \
  -library lib/device/libdilithium5aes_ref.a -headers ref/api.h \
  -library lib/simulator/libdilithium5aes_ref.a -headers ref/api.h \
  -output Dilithium5AES.xcframework
```
