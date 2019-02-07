const mongoose = require("mongoose");

module.exports = {
	maxShares: 10000, //subject to change
	maxLoan: 5600, //subject to change
	defaultbal: 100000,
	shortMax: 100,
	stock: 10,
	heldLimit: 100,
	shortLimit: 100,
	stockParameter: 259.8, //r=0.0192448764
	randomImpact: 100,
	maxStockPriceValue: 5000
}