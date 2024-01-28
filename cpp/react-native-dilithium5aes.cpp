#include "react-native-dilithium5aes.h"
extern "C" {
	#include "headers/api.h"
}

namespace dilithium5aes {
	int generateKeyPair(uint8_t *pk, uint8_t *sk) {
		return pqcrystals_dilithium5aes_ref_keypair(pk, sk);
	}
}
