const Demonzv2 = artifacts.require("Demonzv2");
const Demonzv1 = artifacts.require("MockDemonzv1");

module.exports = async function (deployer) {
  deployer.deploy(Demonzv1).then((_v1) => deployer.deploy(Demonzv2, _v1.address))
}