async function main () {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contract with account ", deployer.address);
    console.log("Deployer balance: ", (await deployer.getBalance()).toString());

    const deployedToken = await (await ethers.getContractFactory('Token')).deploy();

    console.log("Token deployed at address: ", deployedToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });