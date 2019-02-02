module.exports = function (cron) {
    var mongoose = require('mongoose')
    var company = require('../model/company');
    var customer = require('../model/user');
    var news = require('../model/news');
    var parameters = require('./parameters.js');
    mongoose.Promise = global.Promise;


    let companyPriceOnTime = new cron.CronJob({
        cronTime: '*/15 * * * *', // The time pattern when you want the job to start
        onTick: changePrice, // Task to run
        onComplete: reset, // When job is completed and It stops.
        start: true, // immediately starts the job.
        timeZone: "Asia/Kolkata" // The timezone
    });

    var number = 0;

    function changePrice() {
        news.find({}, function (err, News) {

            if (err || (News.length == 0)) {
                console.log(err);
                // res.send("unable to load news");
            } else {
                var k = 0;
                var l;
                while (k <= News.length - 1 && News[k].flag != "2") {
                    k++;
                }
                if ((k < News.length) && (News[k].flag == "2")) {
                    News[k].flag = "3";
                    // console.log("change in",k)
                    console.log("news not available is", k);
                    News[k].save();
                    if (k < News.length - 1) {
                        k++
                    };
                } else {
                    console.log("nothing to depublish");
                }

            }
        });
    }

    function reset() {
        console.log('Task update Completed');
        number = 0;
    }

    return companyPriceOnTime;

};