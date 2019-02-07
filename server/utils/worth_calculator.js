module.exports = function (cron) {
    var mongoose = require('mongoose');
    var parameters = require('./parameters');
    var company = require('../model/company');
    var customer = require('../model/user');

    let customerWorth = new cron.CronJob({
        cronTime: '*/4 * * * *', // The time pattern when you want the job to start
        onTick: calculateWorth, // Task to run
        onComplete: reset, // When job is completed and It stops.
        start: true, // immediately starts the job.
        timeZone: "Asia/Kolkata" // The timezone
    });

    function calculateWorth() {
        customer.find({})
            .populate('portfolio.company_name')
            .then(customerlist => {
                customerlist.map((customer) => {
                    var stockHoldingAmount = 0
                    var stockShortedAmount = 0
                    var total = 0;
                    customer.portfolio.forEach((element) => {
                        stockHoldingAmount += element.company_name.sharePrice * element.stockHolding.quantity
                        stockShortedAmount += element.company_name.sharePrice * element.stockShorted.TotalStock
                        total += element.stockShorted.TotalPrice
                    })
                    customer.networth = customer.accountBalance + stockHoldingAmount + total - stockShortedAmount - customer.loan.amount
                    customer.save()
                })
                console.log('worth calculated')
            }).catch(err => {
                console.log(err)
            });
    }

    function reset() {
        console.log('Task worth Completed');
        number = 0;
    }

    return customerWorth;

};