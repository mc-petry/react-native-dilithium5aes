#include <jni.h>
#include <jsi/jsi.h>
#include "react-native-dilithium5aes.h"

extern "C"
JNIEXPORT void JNICALL
Java_com_dilithium5aes_Dilithium5aesModule_nativeInstall(JNIEnv *env, jclass type, jlong jsiPtr) {
    auto runtime = reinterpret_cast<facebook::jsi::Runtime*>(jsiPtr);
    if (runtime) {
        install(*runtime);
    }
}
