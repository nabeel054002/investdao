//SDPX-License-Identifier: MIT 
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router01.sol";
interface IUniswap {

    function swapExactETHForTokens(uint amountOutMin,
    address[] calldata path, 
    address to, 
    uint deadline)
    external
    payable
    returns (uint[] memory amounts);

    function WETH() external pure returns (address);
    //for path
    //first element is what you spent, the second one is what you recieve
}

contract MyDefiProject{
    IUniswap uniswap;

    constructor(address _uniswap) {
        uniswap = IUniswap(_uniswap);
    }
    
}
