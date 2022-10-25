//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FundToken is ERC20{
    constructor() ERC20("FundToken","FD"){}
    uint256 constant price = 0.1 ether;
    function mint() public payable{
        require(msg.value>= price);
        _mint(msg.sender, (msg.value/price));
    }
}