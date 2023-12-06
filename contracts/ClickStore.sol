// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Image_NFT_MarketPlace is ERC721("DAppFi", "DAPP"), ERC721URIStorage, Ownable {

    struct Artist {
        uint256 artistId;
        address payable artistAddress;
        uint256 artist_fees;
        uint256 price;
        string uri;
        bool registered;
    }
    Artist[] public artists;

    address payable public manager;
    struct Image {   /* to save metadata of images like image ID, address of the seller, price at which it will be sold*/
        uint256 tokenId;
        address payable seller;
        address buyer;
        uint256 price;
        string uri;
        bool statusForBought;
        bool statusForResell;
        uint256 numSales;
    }
    Image[] public images;

    uint256 tokenCounter;
    uint256 mangerIncome;
    uint256 artistCounter;
    

    constructor() Ownable()
    {
       // _owner = initialOwner;
       manager = payable(msg.sender);
    }

    modifier onlyManager() {
        require(
            msg.sender == manager,
            "Only the campaign manager can call this function."
        );
        _;
    }

    function registerArt(uint256 _artist_fees,uint256 price, string memory uri) public {
        require(
           price>0,
           "Price must be greater than 0"
        );
         artists.push(Artist(artistCounter,payable(msg.sender), _artist_fees, price, uri,false));
         artistCounter++;
    }

    function mintArt(uint256 index) public onlyManager payable{

        require(
            msg.value >= artists[index].artist_fees,  /* deployer must send artist fees to art_maker as it selling art_maker's art on market place and gas sent by owner while deploying the contarct must be number of images X artist fee*/
            "Manager must pay artist fee for each token listed on the marketplace"
        );
        images.push(Image(tokenCounter, manager, address(0), artists[index].price, artists[index].uri, false, false,0)); /* pushing the NFT/image into struct*/
        artists[index].registered=true;
        _safeMint(artists[index].artistAddress, tokenCounter);
        _setTokenURI(tokenCounter, artists[index].uri);
        tokenCounter++;
    }

    function buyImage(uint256 tokenId) public payable {
        uint256 price = images[tokenId].price;
        address seller = images[tokenId].seller;
        require(
            seller!=payable(address(0)),
            "NFT not for sale"
        );
        require(
            msg.value >= price,
            "Please send the asking price in order to complete the purchase"
        );
        require(
            !(images[tokenId].statusForBought),
            "Image is already sold and not relisted"
        );
        images[tokenId].seller = payable(address(0)); /* setting seller's address for that NFT to zero as no one is selling it and That NFT is sold*/
        images[tokenId].buyer = msg.sender;
        _transfer(artists[tokenId].artistAddress, msg.sender, tokenId); /* this function is inheritaed from ERC721 contact transfers NFT , now it tranfering NFT from contract to buyer*/
        artists[tokenId].artistAddress.transfer(artists[tokenId].artist_fees);
        payable(seller).transfer(msg.value);
        if(seller==manager)
            mangerIncome+=msg.value;
        images[tokenId].statusForBought = true;
        // images[tokenId].numSales++;
        //emit ImageBought(tokenId, images[tokenId].seller, msg.sender, price); /* this event will log details of purchase on block in blockchain and tells NFT is moved from contract to buyer*/
    }

    function resellImage(uint256 tokenId, uint256 _price) public payable {
        require(
            msg.value >= artists[tokenId].artist_fees
            , "Must pay royalty"
        ); /* here user must pay artist_fees before putting any NFT on sell*/
        require(
            _price > 0,
            "Price must be greater than zero"
        );
        require(
            images[tokenId].statusForBought,
            "Image should be bought first to resell"
        );
        images[tokenId].price = _price; /* user deciding new price of the NFT*/
        images[tokenId].seller = payable(msg.sender); /* user */
        images[tokenId].buyer = address(0);
        // _transfer(msg.sender, address(this), tokenId); /* transfers NFT from user/seller to contract 58:40*/
        //emit ImageRelisted(tokenId, msg.sender, _price); /* this event will log details of purchase on block in blockchain and tells NFT is moved from user/seller to contarct*/
        images[tokenId].statusForBought = false;
        images[tokenId].statusForResell = true;
    }

    struct ArtistReport{
        address artistAddress;
        uint256 balance;
    }
    ArtistReport []  artistReport;

    function getArtist() public view returns (Artist[] memory){
            return artists;
    }

    function getImages() public view returns (Image[] memory){
        return images;
    }

  //  function createReport() public {
  //      delete artistReport;
  //      for (uint i = 0; i < artists.length; i++){
  //          artistReport.push(ArtistReport(artists[i].artistAddress,balanceOf(artists[i].artistAddress)));
  //      }
  //  }

    function getReport() public returns (
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            ArtistReport[] memory
        )
    {
        uint256 neverSold;
        uint256 sold;
        uint256 relisted;

        for (uint i = 0; i < images.length; i++){
            if(images[i].statusForResell==true)
                relisted++;
            if(images[i].statusForBought==true)
                sold++;
            if(images[i].numSales==0)
                neverSold++;
        }
        delete artistReport;
        for (uint i = 0; i < artists.length; i++){
           artistReport.push(ArtistReport(artists[i].artistAddress,balanceOf(artists[i].artistAddress)));
        }

        return (
            artists.length,
            images.length,
            neverSold,
            sold,
            relisted,
            mangerIncome,
            artistReport
        );
    }



    /*The following functions are overrides required by Solidity. Have no impact.*/
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
        {
        return super.tokenURI(tokenId);

    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

}
