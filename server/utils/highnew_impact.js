module.exports = function (cron) {

    var parameters = require('./parameters');
    var company = require('../model/company');
    var mongoose = require('mongoose');
    var news = require('../model/news');


    let companyPriceOnTime = new cron.CronJob({
        cronTime: '*/3 * * * *', // The time pattern when you want the job to start
        onTick: changePrice, // Task to run
        onComplete: reset, // When job is completed and It stops.
        start: true, // immediately starts the job.
        timeZone: "Asia/Kolkata" // The timezone
    });

    let number = 0;

    function changePrice() {
        news.find({}).then(News => {
            News.forEach((element) => {
                if (element.flag == "2") {
                    var id;
                    element.newsImpact.forEach((impact) => {
                        id = impact.company;
                        company.findById(id).then(Company => {
                            Company.sharePrice = (Company.sharePrice * (1 + (impact.impact / parameters.stockParameter))).toFixed(0);
                            Company.history.push({
                                timeStamp: Date.now(),
                                sharePrice: Company.sharePrice,
                                availableQuantity: Company.availableQuantity
                            });
                            Company.save();
                            console.log("high effects",Company.name);
                        }).catch(err => {
                            console.log(err)
                        })
                    })
                }
            })

        }).catch(err => {
            console.log(err)
        });
    }



    function reset() {
        console.log('Task update Completed');
        number = 0;
    }

    return companyPriceOnTime;

};