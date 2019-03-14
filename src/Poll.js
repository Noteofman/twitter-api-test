var Twit = require("twit");
var config = require("./config");

class Poll {
    constructor(overrideParams, intervalTime) {
        this.interval = null;
        this.intervalTime = intervalTime || config.interval_time;
        const params = overrideParams || {
            consumer_key:         config.consumer_key,
            consumer_secret:      config.consumer_secret,
            app_only_auth:        true,
            timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
            strictSSL:            true,     // optional - requires SSL certificates to be valid.
        };
        this.client = new Twit(params);
    }

    start(query) {
        this.interval = setInterval(() => {
            this.client.get("search/tweets", { q: query || config.query, count: 100 },
                (err, data, response) => {
                    console.log(data);
                });
        }, this.intervalTime);
    }

    stop() {
        clearInterval(this.interval);
    }
}

module.exports = Poll;