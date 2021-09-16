const Demonzv2 = artifacts.require("Demonzv2");

module.exports = async function(deployer) {
    await deployer.deploy(Demonzv2);
}