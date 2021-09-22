pragma solidity ^0.8.2;

import "../ERC721.sol";
import "../ERC721Enumerable.sol";

contract MockDemonzv1 is ERC721Enumerable {
    constructor() ERC721 ("CryptoDemonzV1", "DEMONZv1") {}

    function mintToken(uint256 _amount) external payable {
        for (uint256 i=0; i<_amount; ++i) {
            _safeMint(msg.sender, totalSupply());
        }
    }

    function burnToken(uint256 _token_id) external {
        require(ownerOf(_token_id) == msg.sender, "Sender is not owner");
        _burn(_token_id);
    }
}


