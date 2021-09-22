const Demonz = artifacts.require('Demonzv2');
const Demonzv1 = artifacts.require('MockDemonzv1');
contract('Demonzv2', (accounts) => {

    let instance;
    let instancev1;

    beforeEach(async () => {
        instance = await Demonz.deployed();
        instancev1 = await Demonzv1.deployed();
        let mintTxn = await instancev1.mintToken(5);
    });

    it('dummy test', async () => {
        assert(instance.address != '');
        assert(instancev1.address != '');
    });

    it('should mint', async () => {
        await instance.toggleMinting();
        const ethAmount = web3.utils.toWei('0.12', 'ether');
        let tx = await instance.mintToken(2, { value: ethAmount });
        let currentTokenID = await instance.getCurrentTokenId();
        let owner = await instance.ownerOf(1);
        assert.equal(currentTokenID.words[0], 2);
        assert.equal(accounts[0], owner);
    });

    it('can receive eth', async () => {
        const contractBalance = await web3.eth.getBalance(instance.address);
        assert.equal(contractBalance, web3.utils.toWei('0.12', 'ether'))
    });

    it('can accept 721 tokens', async () => {
        let tx = await instance.onERC721Received(
            instancev1.address,
            accounts[0],
            1,
            [0x01, 0x02]
        );
        assert.equal(tx.receipt.status, true);

    });

    // this wont work, will continue tomorrow 
    it('can burn v1 to mint v2', async () => {
        //let totalSupply = await instancev1.totalSupply();
        //let burntxn = await instance.burnV1([1]);
        //await instance.approve(instance.address, 1);

        
        //let owner = await instancev1.ownerOf(1);
        //console.log(owner)
        //let burnTxn = await instance.burnV1([1, 2, 3]);

        //let transfer = instancev1.safeTransferFrom(accounts[0], instance.address, 1);
        await instancev1.setApprovalForAll(instance.address, true);
        let approve = await instancev1.isApprovedForAll(accounts[0], instance.address);
        let txn = await instance.dummyMint(1);
            //console.log(accounts[0]);
    });

})