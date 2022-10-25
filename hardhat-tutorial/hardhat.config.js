require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({path:".env"});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.4",
  networks:{
    hardhat:{
      forking:{
        enabled:true,
        url:process.env.RPC_URL,
        accounts:[process.env.PRIVATE_KEY],
      },
      chainId:1,
    }
  }
};
