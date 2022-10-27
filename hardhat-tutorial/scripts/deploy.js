const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
const {UNISWAP_ROUTER} = require("../constants");
const {BigNumber} = require("ethers");

async function main() {
    const MutualFund = await ethers.getContractFactory("MutualFundV2");
    const deployedMutualFund = await MutualFund.deploy(UNISWAP_ROUTER, BigNumber.from(60*60*24));
    await deployedMutualFund.deployed();
    console.log("Address of AMF:", deployedMutualFund.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
