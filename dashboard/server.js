/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname,"build")))

app.use('/v3/admin', (_, res) => {
   res.sendFile(path.join(__dirname, 'build',"index.html"));
})

console.log("public url", process.env.PUBLIC_URL);
app.listen(PORT, (err) => {
    if (err) {
        console.error(err);
        process.exit(1)
    }
    console.log(`react app started on port ${PORT}`);
})