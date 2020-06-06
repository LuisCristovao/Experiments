const app = require('express')();
const port = 80
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());





var map = {
    "d": "333"
}

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get('/getKey/:key', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    //res.setHeader("Access-Control-Allow-Methods","POST, GET")
    var key = req.params.key;
    try {
        res.send(map[key])
    } catch (error) {
        res.send(`Error: ${error} getting key`)
    }
})

app.get('/setKey/:key/:value', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    //res.setHeader("Access-Control-Allow-Methods","POST, GET")
    var key = req.params.key;
    var value = req.params.value;
    try {
        map[key] = value
        console.log(map[key])
        res.send(`Inserted ${key}:${value}! `)
    } catch (error) {
        res.send(`Error: ${error} setting key`)
    }
})

app.post('/gKey', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const key = req.body
    console.log(key)

    try {
        res.send(map[key])
    } catch (error) {
        res.send(`Error: ${error} getting key`)
    }
})

app.post('/sKey', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const data = JSON.parse(req.body)
    try {
        const key = data.key
        const value = data.value
        map[key] = value
        console.log(map[key])
        res.send(`Inserted ${key}:${value}! `)
    } catch (error) {
        res.send(`Error: ${error} setting key`)
    }
})

app.listen(port, () => console.log('Example app listening on port ' + port + '!'))
