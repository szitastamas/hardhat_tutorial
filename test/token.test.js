const { expect, assert } = require("chai");

describe("Token", () => {
    // "owner" is the default account, the very first in the accounts array
    let owner;

    let acc1;
    let acc2;

    // The deployed contract to interact with
    let token;

    beforeEach(async () => {
        [owner, acc1, acc2] = await ethers.getSigners();
        token = await (await ethers.getContractFactory('Token')).deploy();
    })

    describe('Deployment', () => {
        it('sets the sender of the deployment as owner', async () => {
            expect(owner.address).to.be.equal(await token.owner());
        })

        it('sets balance to 100000000 for owner at deployement', async () => {
            const ownerBalance = await token.balanceOf(owner.address);
            expect(ownerBalance).to.equal(await token.totalSupply());
        })
    })

    describe('Transaction', () => {
        it('takes 500 from the supplier', async () => {
            await token.transfer(acc1.address, 500);
            const ownerBalance = await token.balanceOf(owner.address);
            expect(ownerBalance).to.be.equal(await token.totalSupply() - 500);
        })
    
        it('gives acc1 500 tokens', async () => {
            await token.transfer(acc1.address, 500);
            const acc1Balance = await token.balanceOf(acc1.address);
            expect(acc1Balance).to.be.equal(500);
        })
        
        it('fails if you try to transfer more than what you own', async () => {
            await token.transfer(acc1.address, 500);
            await expect(token.connect(acc1).transfer(acc2.address, 550)).to.be.revertedWith('Insufficient Funds');
        })
    
        it('can transfer tokens between non-owner accounts', async () => {
            await token.transfer(acc1.address, 500);
            await token.connect(acc1).transfer(acc2.address, 150);
            expect(await token.balanceOf(acc1.address)).to.equal(350);
            expect(await token.balanceOf(acc2.address)).to.equal(150);
        })
    })
    
})
