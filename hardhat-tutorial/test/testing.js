const { expect } = require("chai");
const {BigNumber} = require("ethers");

describe("MutualFund", function () {
    it("User can take part", async function () {
        const [owner, user] = await ethers.getSigners();
        const MutualFund = await ethers.getContractFactory("MutualFund");
        const deployedContract = await MutualFund.connect(owner).deploy();
        await deployedContract.deployed();

        deployedContract.connect(user);
        await deployedContract.connect(user).takePart({
            value: ethers.utils.parseEther("0.11")
        });
        console.log(await deployedContract.balances(await user.getAddress()));
        expect( await deployedContract.balances(user.address)).to.be.equal(1);

    })
    it("User can create a proposal", async function () {
        const [owner, user] = await ethers.getSigners();
        const MutualFund = await ethers.getContractFactory("MutualFund");
        const deployedContract = await MutualFund.connect(owner).deploy();
        await deployedContract.deployed();
        await deployedContract.connect(user).takePart({
            value: ethers.utils.parseEther("0.11")
        });
        // await deployedContract.connect(usertwo).takePart({
        //     value: ethers.utils.parseEther("0.10")
        // })

        await deployedContract.connect(user).createProposal("0x514910771AF9Ca656af840dff83E8264EcF986CA","LINK", 18, {
            value:ethers.utils.parseEther("0.01")
        });

        console.log(await deployedContract.proposals("0x514910771AF9Ca656af840dff83E8264EcF986CA"));
    })

    // it("User can vote on a proposal", async function () {
    //     const [owner, user, usertwo] = await ethers.getSigners();
    //     const MutualFund = await ethers.getContractFactory("MutualFund");
    //     const deployedContract = await MutualFund.connect(owner).deploy();
    //     await deployedContract.deployed();
    //     await deployedContract.connect(user).takePart({
    //         value: ethers.utils.parseEther("0.11")
    //     });
    //     // await deployedContract.connect(usertwo).takePart({
    //     //     value: ethers.utils.parseEther("0.10")
    //     // })

    //     await deployedContract.connect(user).createProposal({
    //         value:ethers.utils.parseEther("0.01"),
    //         arguments:{_tokenAddress:("0x514910771AF9Ca656af840dff83E8264EcF986CA",
    //         _tokenName: "LINK",
    //         _decimals: 18}
    //     });

    //     console.log(deployedContract.proposals);

    // })
})