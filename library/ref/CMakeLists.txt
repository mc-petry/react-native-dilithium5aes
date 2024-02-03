set(DILITHIUM_SRCS sign.c packing.c polyvec.c poly.c ntt.c reduce.c rounding.c)
set(DILITHIUM_FIPS202_SRCS ${DILITHIUM_SRCS} symmetric-shake.c)
set(DILITHIUM_AES_SRCS ${DILITHIUM_SRCS} symmetric-aes.c)
set(FIPS202_SRCS fips202.c)
set(AES256CTR_SRCS aes256ctr.c)
set(RANDOMBYTES_SRCS randombytes.c)

if(MSVC)
  add_compile_options(/nologo /O2 /W4 /wd4146 /wd4244)
else()
  add_compile_options(-Wall -Wextra -Wpedantic -Werror)
  add_compile_options(-Wmissing-prototypes -Wredundant-decls -Wshadow -Wpointer-arith)
  add_compile_options(-O3 -fomit-frame-pointer)
endif()

# Dilithium 5
add_library(dilithium5aes_ref ${DILITHIUM_AES_SRCS} ${FIPS202_SRCS} ${AES256CTR_SRCS} ${RANDOMBYTES_SRCS})
target_compile_definitions(dilithium5aes_ref PUBLIC DILITHIUM_MODE=5 DILITHIUM_USE_AES)
target_link_libraries(dilithium5aes_ref PUBLIC fips202_ref aes256ctr_ref)
