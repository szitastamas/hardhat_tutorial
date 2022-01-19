// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0;

import "hardhat/console.sol";

contract Token {

    string public name = "Fetish Spreads";
    string public symbol = "FTSH";
    uint256 public totalSupply = 100000000;
    address public owner;
    mapping(address => uint256) balances;

    constructor() {
        owner = msg.sender;
        balances[msg.sender] = totalSupply;
    }

    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient Funds");
        console.log("%s is transfering %s tokens to account: %s", msg.sender, amount, to);

        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }

}