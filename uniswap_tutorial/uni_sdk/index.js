const { ChainId, Fetcher, WETH, Route } = require("@uniswap/sdk");

const chainid = ChainId.MAINNET;
//is it working as a mainnet fork 
const tokenAddress = "0x6b175474e89094c44da98b954eedeac495271d0f";

const init = async () => {
    const dai = await Fetcher.fetchTokenData(chainid, tokenAddress);
    const weth = WETH[chainid];
    const pair = await Fetcher.fetchPairData(dai, weth);
    const route = new Route([pair], weth);
    console.log(route.midPrice.toSignificant(6));
    console.log(route.midPrice.invert().toSignificant(6));
}
 init();
 //this is the way to get prices as there can be onchain manipulation 
 