var Crawler = require("node-webcrawler");
var url = require('url');
 /*
var r6 = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page 
    callback : function (error, result, $) {
        // $ is Cheerio by default 
        //a lean implementation of core jQuery designed specifically for the server 
        if(error){
            console.log(error);
        }else{
            value = $( "div.value" ).text().split("\n")
            console.log(value[5])
        }
    }
});

r6.queue('https://r6stats.com/stats/uplay/morkh1436')
*/


var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page 
    callback : function (error, result, $) {

        if(error){
            console.log(error);
        }else{
            value = $("div.table-row row").text();
            console.log(value)
        }
    }
});

c.queue('https://masterpubg.com/profile/Morkh')