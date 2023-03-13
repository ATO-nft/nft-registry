// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Registry is Ownable {
    enum Status {
        unregistered,
        registered,
        stolen
    }

    struct Asset {
        uint network;
        address contractAddress;
        uint id;
        uint Status;
    }
    Asset[] public assets;

    event Registered(uint network, address contractAddress, uint id);

    constructor() {}

    function addEntry(
        uint _network,
        address _contractAddress,
        uint _id
    ) public {
        assets.push(
            Asset({
                network: _network,
                contractAddress: _contractAddress,
                id: _id,
                Status: 1
            })
        );
        emit Registered(_network, _contractAddress, _id);
    }

    function editEntry() public {}

    receive() external payable {
        revert();
    }

    fallback() external payable {
        revert();
    }
}
