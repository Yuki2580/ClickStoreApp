# ClickStoreApp

This project is to build the NFT market place to sell and buy images.

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

opensslErrorStack: [ 'error:03000086:digital envelope          
  routines::initialization error' ],
  library: 'digital envelope routines',
  reason: 'unsupported',
  code: 'ERR_OSSL_EVP_UNSUPPORTED'

export NODE_OPTIONS=--openssl-legacy-providerを設定することでエラー解消できる
