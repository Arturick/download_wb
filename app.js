require('dotenv').config();

const express = require('express')
const cors = require('cors');
const app = express()

const router = require('./router');
const middleWare = require('./middle-ware');

app.use(cors({
    allow: '*'
}));
app.use(express.json());
app.use(router);
app.use(middleWare.error);

async function start(){
    await app.listen(process.env.PORT, () => {
        console.log(`server start on ${process.env.PORT} port`);
    })
}

start();


