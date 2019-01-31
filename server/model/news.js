const mongoose = require("mongoose");

const newsSchema = mongoose.Schema({
	newsText: String,
	publishedOn: {
		type: Date,
		default: Date.now()
	},
	createdOn: {
		type: Date,
		default: Date.now()
	},
	newsImpact: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Company"
	}],
	description : String,

});

module.exports = mongoose.model("News", newsSchema);
