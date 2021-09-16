// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC721.sol";
import './utils/Ownable.sol';
import "./libs/Strings.sol";
import "./ERC721Enumerable.sol";

contract Demonzv2 is ERC721Enumerable, Ownable {
    using Strings for uint256;

    uint256 public MAX_TOKENS = 15000;
    uint256 public MAX_PER_TX = 20;
    uint256 public MAX_PER_WALLET = 50;
    uint256 public PRICE = 0.06 ether;

    string public BEGINNING_URI = "";
    string public ENDING_URI = "";

    bool public ALLOW_MINTING = false;

    constructor() ERC721 ("CryptoDemonzV2", "DEMONZv2") {}

    function mintToken(uint256 _amount) external payable {
        require(ALLOW_MINTING, "Minting has not begun yet");
        require(msg.value == _amount * PRICE, "Incorrect amount of ETH sent");
        require(_amount <= MAX_PER_TX, "Too many tokens queried for minting");
        require(totalSupply() + _amount <= MAX_TOKENS, "Not enough NFTs left to mint");
        require(balanceOf(msg.sender) + _amount <= MAX_PER_WALLET, "Exceeds wallet max allowed balance");

        for (uint256 i=0; i<_amount; ++i) {
            _safeMint(msg.sender, totalSupply());
        }
    }

    function burnV1(uint256[] memory _ids) external payable {
        require(_ids.length == 3, "You should burn only 3");
        require(ALLOW_MINTING, "Minting has not begun yet");
        require(totalSupply() + _ids.length <= MAX_TOKENS, "Not enough NFTs left to mint");
        require(balanceOf(msg.sender) + _ids.length <= MAX_PER_WALLET, "Exceeds wallet max allowed balance");
        for (uint256 i=0; i<_ids.length; ++i) {
            require(ownerOf(_ids[i]) == msg.sender, "Sender is not owner");
            _burn(_ids[i]);
        }

        _safeMint(msg.sender, totalSupply());
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        return string(abi.encodePacked(BEGINNING_URI, tokenId.toString(), ENDING_URI));
    }

    function withdraw() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
    
    function toggleMinting() external onlyOwner {
        ALLOW_MINTING = !ALLOW_MINTING;
    }

    function setBeginningURI(string memory _new_uri) external onlyOwner {
        BEGINNING_URI = _new_uri;
    }

    function setEndingURI(string memory _new_uri) external onlyOwner {
        ENDING_URI = _new_uri;
    }
     
}