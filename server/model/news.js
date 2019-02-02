const mongoose = require("mongoose");

const newsSchema = mongoose.Schema({
	newsText: String,
	publishedOn: {
		type: Date,
		default: Date.now()
	},
	flag: {
		type: String,
		default: "0",
		required: true
	},
	createdOn: {
		type: Date,
		default: Date.now()
	},
	newsImpact: [{
		company: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Company"
		},
		impact: Number,
	}],
	description: String,


});

module.exports = mongoose.model("News", newsSchema);