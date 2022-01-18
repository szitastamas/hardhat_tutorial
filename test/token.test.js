const { expect, assert } = require("chai");

describe("Token", () => {

    let owner;
    let acc1;
    let acc2;
    let token;

    beforeEach(async () => {
        [owner, acc1, acc2] = await ethers.getSigners();
        token = await (await ethers.getContractFactory('Token')).deploy();
    })

    it('sets balance to 100000000 for owner at deployement', async () => {
        const ownerBalance = await getOwnerBalance();
        expect(ownerBalance).to.equal(await token.totalSupply());
    })
    
    it('takes 500 from the supplier', async () => {
        await token.transfer(acc1.address, 500);
        const ownerBalance = await getOwnerBalance();
        expect(ownerBalance).to.be.equal(await token.totalSupply() - 500);
        
    })

    it('gives acc1 500 tokens', async () => {
        await token.transfer(acc1.address, 500);
        const acc1Balance = await token.balanceOf(acc1.address);
        expect(acc1Balance).to.be.equal(500);
    })
    
    it('cannot transfer more than what you own', async () => {
        await token.transfer(acc1.address, 500);
        try {
            await token.connect(acc1).transfer(acc2.address, 550)
            assert(false);
        } catch (error) {
            expect(error).to.contain(/.*(INSUFFICIENT_FUNDS).*/);
        }
    })
    
    async function getOwnerBalance() {
        return await token.balanceOf(owner.address);
    }
})
