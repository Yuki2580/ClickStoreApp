require("@nomicfoundation/hardhat-toolbox");
/** @type import('hardhat/config').HardhatUserConfig */
// const GOERLI_PRIVATE_KEY = "net rally inmate gas finish boy balcony tree ceiling lucky cattle bird";

module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: "sepolia infura url here",
      accounts: ["account here"]
    }
  }
};