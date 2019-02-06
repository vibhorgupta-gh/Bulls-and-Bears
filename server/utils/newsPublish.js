module.exports = function (cron) {

    var mongoose = require('mongoose')
    var company = require('../model/company');
    var customer = require('../model/user');
    var news = require('../model/news');
    var parameters = require('./parameters.js');
    mongoose.Promise = global.Promise;


    let companyPriceOnTime = new cron.CronJob({
        cronTime: '*/5 * * * *', // The time pattern when you want the job to start running every 15 minutes
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
                var l = 0;
                while(News[l].flag!="0" && l<News.length)
                {
                    l++;
                }
                if ((l < News.length)) {
                    News[l].flag = "1";
                    News[l].publishedOn = Date.now();
                    console.log(News.publishedOn);
                    // console.log("change in",k)
                    console.log("news available is", l);
                    News[l].save();
                }
                else
                {
                    console.log("no news is available");
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