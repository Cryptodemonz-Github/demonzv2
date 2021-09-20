const Demonz = artifacts.require('Demonzv2');

contract('Demonzv2', (accounts) => {

    let instance;

    beforeEach(async () => {
        instance = await Demonz.deployed();
    });

    it('dummy test', async () => {
        assert(instance.address != '');
    });

    it('should mint', async () => {
        await instance.toggleMinting();
        const ethAmount = web3.utils.toWei('0.12', 'ether');
        let tx = await instance.mintToken(2, { value: ethAmount });
        let currentTokenID = await instance.getCurrentTokenId();
        assert.equal(currentTokenID.words[0], 2);
    });

    it('can receive eth', async () => {
        const contractBalance = await web3.eth.getBalance(instance.address);
        assert.equal(contractBalance, web3.utils.toWei('0.12', 'ether'))
    });

    // this wont work, will continue tomorrow 
    it('can burn v1 to mint v2', async () => {
        let tx = await instance.burnV1([1, 2, 3]); 
    });

})