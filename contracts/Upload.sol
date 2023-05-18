// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

// loaclhost hardhat deploy address:-0x5FbDB2315678afecb367f032d93F642f64180aa3
contract Upload {
    struct Access {
        address user;
        bool access;
    }

    mapping(address => string[]) value; //this store all images/file "url" inside array and mapped, with user address
    mapping(address => mapping(address => bool)) ownership;
    mapping(address => Access[]) accesslist; //this will store another user address and its state that the user is accessed its content or not
    mapping(address => mapping(address => bool)) previousData;

    function add(string calldata _url) external {
        value[msg.sender].push(_url);
    }

    function allow(address _user) external {
        ownership[msg.sender][_user] = true; //ownership[myaddress]=>[friend1_address] = true;
        // it means it track my Access list (owner access list)

        if (previousData[msg.sender][_user]) {
            for (uint i = 0; i < accesslist[msg.sender].length; i++) {
                if (accesslist[msg.sender][i].user == _user) {
                    accesslist[msg.sender][i].access = true;
                }
            }
        } else {
            accesslist[msg.sender].push(Access(_user, true));
            previousData[msg.sender][_user] = true;
        }
    }

    function disAllow(address _user) external {
        ownership[msg.sender][_user] = false;

        for (uint i = 0; i < accesslist[msg.sender].length; i++) {
            if (accesslist[msg.sender][i].user == _user) {
                accesslist[msg.sender][i].access = false;
            }
        }
    }

    //in "view" function mode "msg.sender" does not work
    // so, we need to change the bellow code
    function display(
        address _owner,
        address _user
    ) external view returns (string[] memory) {
        require(
            _user == _owner || ownership[_user][_owner],
            "You don't have access"
        );
        return value[_user];
    }

    function shareAccess(address _owner) public view returns (Access[] memory) {
        return accesslist[_owner];
    }
}
