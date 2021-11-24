var TradeCard = artifacts.require("./TradeCard.sol");

module.exports = function(deployer) {
  deployer.deploy(TradeCard);
};
