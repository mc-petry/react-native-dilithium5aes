#include "react-native-dilithium5aes.h"
#include "TypedArray.h" // Include your typed array header
#include <jsi/jsi.h>
#include <vector>
extern "C" {
  #include "headers/api.h"
}

using namespace facebook::jsi;
using namespace std;

vector<uint8_t> extractUint8Array(Runtime &runtime, const Value &jsValue) {
  // if (!jsValue.isObject()) {
  //     throw jsi::JSError(runtime, "Expected an object for Uint8Array conversion.");
  // }
  
  auto jsObject = jsValue.getObject(runtime);
  auto jsBuffer = jsObject.getProperty(runtime, "buffer").getObject(runtime);
  auto jsArrayBuffer = jsBuffer.getArrayBuffer(runtime);
  return vector<uint8_t>(jsArrayBuffer.data(runtime), jsArrayBuffer.data(runtime) + jsArrayBuffer.size(runtime));
}

void installDilithium5aes(Runtime &runtime) {
    // keyPair JSI
    auto keyPairJSI = Function::createFromHostFunction(runtime,
      PropNameID::forAscii(runtime, "keyPair"),
      0, // Number of arguments
      [](Runtime &runtime, const Value &thisValue, const Value *arguments, size_t count) -> Value {
          vector<uint8_t> publicKey(pqcrystals_dilithium5_ref_PUBLICKEYBYTES);
          vector<uint8_t> secretKey(pqcrystals_dilithium5_ref_SECRETKEYBYTES);

          int result = pqcrystals_dilithium5aes_ref_keypair(publicKey.data(), secretKey.data());
          if (result != 0) {
              throw JSError(runtime, "Failed to generate key pair.");
          }

          TypedArray<TypedArrayKind::Uint8Array> jsPublicKey(runtime, publicKey);
          TypedArray<TypedArrayKind::Uint8Array> jsSecretKey(runtime, secretKey);

          Object resultObj(runtime);
          resultObj.setProperty(runtime, "publicKey", jsPublicKey);
          resultObj.setProperty(runtime, "secretKey", jsSecretKey);
          return resultObj;
      });

    runtime.global().setProperty(runtime, "keyPair", std::move(keyPairJSI));

    // sign JSI
    auto signJSI = Function::createFromHostFunction(runtime,
      PropNameID::forAscii(runtime, "sign"),
      2, // Number of arguments
      [](Runtime &runtime, const Value &thisValue, const Value *arguments, size_t count) -> Value {
        if (count != 2) {
          throw JSError(runtime, "Invalid number of arguments for 'sign'.");
        }

        vector<uint8_t> message = extractUint8Array(runtime, arguments[0]);
        vector<uint8_t> secretKey = extractUint8Array(runtime, arguments[1]);
        vector<uint8_t> signature(pqcrystals_dilithium5_ref_BYTES);
        size_t siglen;

        int result = pqcrystals_dilithium5aes_ref_signature(signature.data(), &siglen, message.data(), message.size(), secretKey.data());
        if (result != 0) {
            throw jsi::JSError(runtime, "Failed to sign the message.");
        }

        // Create a TypedArray from the signature vector
        TypedArray<TypedArrayKind::Uint8Array> jsSignatureArray(runtime, signature);
        Object resultObj(runtime);
        resultObj.setProperty(runtime, "signature", jsSignatureArray);
        return resultObj;
      });

    runtime.global().setProperty(runtime, "sign", std::move(signJSI));

    auto verifyJSI = Function::createFromHostFunction(runtime,
    	PropNameID::forAscii(runtime, "verify"),
    	3, // Number of arguments
    	[](Runtime &runtime, const Value &thisValue, const Value *arguments, size_t count) -> Value {
        if (count != 3) {
          throw JSError(runtime, "Invalid number of arguments for 'verify'.");
        }

        vector<uint8_t> signature = extractUint8Array(runtime, arguments[0]);
        vector<uint8_t> message = extractUint8Array(runtime, arguments[1]);
        vector<uint8_t> publicKey = extractUint8Array(runtime, arguments[2]);

        int result = pqcrystals_dilithium5aes_ref_verify(signature.data(), signature.size(), message.data(), message.size(), publicKey.data());
        return Value(runtime, result == 0); // Return true if verification is successful
    	});

    runtime.global().setProperty(runtime, "verify", std::move(verifyJSI));
}
