#include "react-native-dilithium5aes.h"
extern "C" {
	#include "headers/api.h"
}

namespace dilithium5aes {
	int generateKeyPair(uint8_t *pk, uint8_t *sk) {
		return pqcrystals_dilithium5aes_ref_keypair(pk, sk);
	}

	int signMessage(uint8_t *sig, size_t *siglen, const uint8_t *m, size_t mlen, const uint8_t *sk) {
		return pqcrystals_dilithium5aes_ref_signature(sig, siglen, m, mlen, sk);
	}
}
