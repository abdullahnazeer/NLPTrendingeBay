var http = require('http');
const express = require('express');
var router = express.Router();
var eBay = require('ebay-node-api');

let ebay = new eBay({
    clientID: "pricefin-pricefin-PRD-bf2cd4cf7-bca5e5ee",
    limit: 20,// fetches top 10 results in form of JSON.
    env: "PRODUCTION" // optional default = "PRODUCTION"
});

var searchTerm;

router.get('/:search', function (req, res, next) {
    console.log('requested url: ' + req.url);
    console.log('requested item: ' + req.params.search);
    searchTerm = req.params.search;
    calculatePrice(searchTerm, res);
});


router.get('/relateditems', function (req, res, next) {
    getRecommended(searchTerm, res);
});

router.get('/test',(req,res)=>{
    console.log('GET Method Valid');
    console.log(`Requested URL ${req.url}`);
    res.end("PriceFinder RESTful API");
});

function getRecommended(searchTerm, res) {


    var finalJson;
    let ebay = new eBay({
        clientID: "pricefin-pricefin-PRD-bf2cd4cf7-bca5e5ee",
        limit: 20,// fetches top 10 results in form of JSON.
        env: "PRODUCTION" // optional default = "PRODUCTION"
    })

    var jsonRes = [];
    stri = "";
    var predictedJson = {
        hi: "hello"
    };
    var prices = 0;
    var pArr = [];
    var total = 0;

    ebay.findItemsByKeywords(searchTerm).then((data) => {
        jsonRes = data;

        var itemCount = 0;

        for (var searchResult in jsonRes[0].searchResult[0].item) {
            console.log(JSON.stringify(jsonRes[0].searchResult[0].item[0].galleryURL[0]));

            prices = (JSON.stringify(jsonRes[0].searchResult[0].item[searchResult].sellingStatus[0].currentPrice[0].__value__));


            var fPrice = parseFloat(prices.replace(/"/g, ''));
            total = fPrice + total;
            pArr.push(fPrice);
            itemCount++;

        }

        console.log("Total : " + total);
        console.log("items : " + itemCount);
        console.log("Average : " + total / itemCount);

        predictedPrice = total / itemCount;

        predictedJson = {
            total: total,
            itemCount: itemCount,
            predictedPrice: predictedPrice
        };

        return predictedJson;
    }, (error) => {
        console.log(error);
        error2 = {
            total: total,
            itemCount: itemCount,
            predictedPrice: predictedPrice
        };
    }).then((json) => {
        console.log(json);
        finalJson = json;
        res.end(JSON.stringify(json));
    }, function (error) {
        console.log(error);
    });
}

function calculatePrice(searchTerm, res) {


    var finalJson;
    let ebay = new eBay({
        clientID: "pricefin-pricefin-PRD-bf2cd4cf7-bca5e5ee",
        limit: 20,// fetches top 10 results in form of JSON.
        env: "PRODUCTION" // optional default = "PRODUCTION"
    })

    // const searchTerm = "iphone 5s";
    var jsonRes = [];
    stri = "";
    var predictedJson = {
        hi: "hello"
    };
    var prices = 0;
    var pArr = [];
    var total = 0;

    ebay.findItemsByKeywords(searchTerm).then((data) => {
        jsonRes = data;
        var itemCount = 0;

        for (var searchResult in jsonRes[0].searchResult[0].item) {
            console.log(JSON.stringify(jsonRes[0].searchResult[0].item[0]));

            prices = (JSON.stringify(jsonRes[0].searchResult[0].item[searchResult].sellingStatus[0].currentPrice[0].__value__));


            var fPrice = parseFloat(prices.replace(/"/g, ''));
            total = fPrice + total;
            pArr.push(fPrice);
            itemCount++;


        }


        console.log("Total : " + total);
        console.log("items : " + itemCount);
        console.log("Average : " + total / itemCount);

        predictedPrice = total / itemCount;


        predictedJson = {
            total: total,
            itemCount: itemCount,
            predictedPrice: predictedPrice
        };
        return predictedJson;
    }, (error) => {
        console.log(error);
        error2 = {
            total: total,
            itemCount: itemCount,
            predictedPrice: predictedPrice
        };
    }).then((json) => {
        console.log(json);
        finalJson = json;
        res.end(JSON.stringify(json));
    }, function (error) {
        console.log(error);
    });
}

http.createServer(router).listen(3000);

console.log("server is running");