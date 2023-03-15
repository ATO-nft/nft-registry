// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Registry is Ownable {
    enum Status {
        ACTIVE,
        DELETED,
        FROZEN,
        STOLEN,
        LOST,
        MOVED
    }

    struct Asset {
        uint network;
        address contractAddress;
        uint id;
        uint Status;
        string registrar;
        uint registryId;
        string info;
        string ensName;
    }
    Asset[] public assets;

    event Registered(uint network, address contractAddress, uint id);
    event Edited(uint network, address contractAddress, uint id);

    constructor() {}

    function addEntry(
        uint _network,
        address _contractAddress,
        uint _id,
        uint _Status,
        string memory _registrar,
        uint _registryId,
        string memory _info,
        string memory _ensName
    ) public onlyOwner {
        assets.push(
            Asset({
                network: _network,
                contractAddress: _contractAddress,
                id: _id,
                Status: _Status,
                registrar: _registrar,
                registryId: _registryId,
                info: _info,
                ensName: _ensName
            })
        );
        emit Registered(_network, _contractAddress, _id);
    }

    function editEntry(
        uint _network,
        address _contractAddress,
        uint _id,
        uint _Status,
        string memory _registrar,
        uint _registryId,
        string memory _info,
        string memory _ensName
    ) public onlyOwner {
        uint i = getAsset(_registryId);
        assets[i].network = _network;
        assets[i].contractAddress = _contractAddress;
        assets[i].id = _id;
        assets[i].Status = _Status;
        assets[i].registrar = _registrar;
        assets[i].info = _info;
        assets[i].ensName = _ensName;
        emit Edited(_network, _contractAddress, _id);
    }

    function getAsset(uint _registryId) public view returns (uint) {
        uint result;

        for (uint i; i < assets.length; i++) {
            if (assets[i].registryId == _registryId) {
                result = i;
            }
        }
        return result;
    }

    receive() external payable {
        revert();
    }

    fallback() external payable {
        revert();
    }
}
