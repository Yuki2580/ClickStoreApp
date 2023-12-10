require("@nomicfoundation/hardhat-toolbox");
/** @type import('hardhat/config').HardhatUserConfig */
// const GOERLI_PRIVATE_KEY = "GOERLI private key here";

module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: "sepolia infura url here",
      accounts: ["account here"]
    }
  }
};
