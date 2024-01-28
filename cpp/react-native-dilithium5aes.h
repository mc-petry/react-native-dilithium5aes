#ifndef DILITHIUM5AES_H
#define DILITHIUM5AES_H

#include <cstdint>
#include <cstddef>

namespace dilithium5aes {
  int generateKeyPair(uint8_t *pk, uint8_t *sk);
  int signMessage(uint8_t *sig, size_t *siglen, const uint8_t *m, size_t mlen, const uint8_t *sk);
}

#endif /* DILITHIUM5AES_H */
