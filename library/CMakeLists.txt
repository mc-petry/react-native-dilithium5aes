cmake_minimum_required(VERSION 3.14)

project(dilithium C ASM)

set(CMAKE_C_STANDARD 99)
set(CMAKE_C_STANDARD_REQUIRED ON)

enable_testing()

add_subdirectory(ref)

target_compile_options(dilithium5aes_ref PRIVATE "-Wno-shorten-64-to-32")
