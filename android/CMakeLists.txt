cmake_minimum_required(VERSION 3.14)
project(Dilithium5aes)

set (CMAKE_VERBOSE_MAKEFILE ON)
set (PACKAGE_NAME "ReactNativeDilithium5aes")
set (CMAKE_CXX_STANDARD 17)

# Find ReactAndroid and fbjni
find_package(ReactAndroid REQUIRED CONFIG)
find_package(fbjni REQUIRED CONFIG)

# Append Android flag
string(APPEND CMAKE_CXX_FLAGS " -DANDROID")

# Add your library source files
add_library(
  ${PACKAGE_NAME}
  SHARED
  ../cpp/TypedArray.cpp
  ../cpp/react-native-dilithium5aes.cpp
  cpp-adapter.cpp
)

# Specifies a path to native header files.
target_include_directories(
  ${PACKAGE_NAME}
  PRIVATE
  "../cpp"
  "../dilithium/ref"
  "${NODE_MODULES_DIR}/react-native/ReactCommon"
  "${NODE_MODULES_DIR}/react-native/ReactCommon/callinvoker"
  "${NODE_MODULES_DIR}/react-native/ReactAndroid/src/main/jni/react/turbomodule" # <-- CallInvokerHolder JNI wrapper
)

# Set linker language to C++
set_target_properties(${PACKAGE_NAME} PROPERTIES LINKER_LANGUAGE CXX)

# Link libraries
target_link_libraries(
  ${PACKAGE_NAME}
  android                         # <-- log
  ReactAndroid::jsi               # <-- jsi.h
  ReactAndroid::reactnativejni    # <-- CallInvokerImpl
  fbjni::fbjni                    # <-- fbjni.h
)





