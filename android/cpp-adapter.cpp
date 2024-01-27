#include <jni.h>
#include "react-native-dilithium5aes.h"

extern "C"
JNIEXPORT jdouble JNICALL
Java_com_dilithium5aes_Dilithium5aesModule_nativeMultiply(JNIEnv *env, jclass type, jdouble a, jdouble b) {
    return dilithium5aes::multiply(a, b);
}
