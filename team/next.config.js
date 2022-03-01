/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require("dotenv");
dotenv.config()

module.exports = {
    env: {
        PAYSTACK_SECRET: process.env.PAYSTACK_SECRET
    }
}