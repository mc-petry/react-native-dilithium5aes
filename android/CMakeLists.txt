cmake_minimum_required(VERSION 3.4.1)
project(Dilithium5aes)

set (CMAKE_VERBOSE_MAKEFILE ON)
set (CMAKE_CXX_STANDARD 11)

add_library(react-native-dilithium5aes            SHARED
            ../cpp/react-native-dilithium5aes.cpp
            cpp-adapter.cpp
)

# Specifies a path to native header files.
include_directories(
            ../cpp
)
