const Demonzv2 = artifacts.require("Demonzv2");
const Demonzv1 = artifacts.require("MockDemonzv1");

module.exports = async function(deployer) {
    await deployer.deploy(Demonzv2);
    await deployer.deploy(Demonzv1);
}