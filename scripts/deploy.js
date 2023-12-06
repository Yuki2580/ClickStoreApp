const { ethers } = require("hardhat");

async function main() {

  const [sender] = await ethers.getSigners();
  // console.log(sender);
  const ClickStore = await ethers.getContractFactory("Image_NFT_MarketPlace");
  
  const contract = await ClickStore.deploy();
  await contract.deployed();
  console.log("Contract deployed at:", contract.address);
  console.log("Signer address used by Hardhat",sender.address)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});