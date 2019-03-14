const Promise = require("bluebird");
const mongoose = require("mongoose");
const httpStatus = require("http-status");
const APIError = require("../helpers/APIError");

/**
 * Tweet Schema
 */
const TweetSchema = new mongoose.Schema({
    created_at: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
    },
});


/**
 * Statics
 */
TweetSchema.statics = {
    /**
   * Get tweet
   * @param {ObjectId} id - The objectId of tweet.
   * @returns {Promise<Tweet, APIError>}
   */
    get(id) {
        return this.findById(id)
            .exec()
            .then((tweet) => {
                if (tweet) {
                    return tweet;
                }
                const err = new APIError("No such tweet exists!", httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },

    /**
   * List tweets in descending order of 'createdAt' timestamp.
   * 
   * @param {number} skip - Number of tweets to be skipped.
   * @param {number} limit - Limit number of tweets to be returned.
   * @returns {Promise<Tweet[]>}
   */
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
            .sort({ created_at: -1 })
            .skip(+skip)
            .limit(+limit)
            .exec();
    }
};

/**
 * @typedef Tweet
 */
module.exports = mongoose.model("Tweet", TweetSchema);