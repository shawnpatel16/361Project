const express = require('express')
const app = express()
const fs = require('fs')




app.get("/habit/test", async (req, res) => {

    let requestData = "ANY"
    fs.writeFile('REQUEST', requestData, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("written successfully")
        }
    })
    await new Promise(resolve => setTimeout(resolve,1000))
    fs.readFile('REQUEST', 'utf-8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        console.log("reading data")
        console.log(data)
        res.json(data)
    })
    
})

app.get("/habit/workout", async (req, res) => {

    let requestData = "WORKOUT"
    fs.writeFile('REQUEST', requestData, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("written successfully")
        }
    })
    await new Promise(resolve => setTimeout(resolve, 1000))
    fs.readFile('REQUEST', 'utf-8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        console.log("reading data")
        console.log(data)
        res.json(data)
    })

})

app.get("/habit/meal", async (req, res) => {

    let requestData = "MEAL"
    fs.writeFile('REQUEST', requestData, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("written successfully")
        }
    })
    await new Promise(resolve => setTimeout(resolve, 1000))
    fs.readFile('REQUEST', 'utf-8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        console.log("reading data")
        console.log(data)
        res.json(data)
    })

})

app.get("/habit/book", async (req, res) => {

    let requestData = "BOOK"
    fs.writeFile('REQUEST', requestData, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("written successfully")
        }
    })
    await new Promise(resolve => setTimeout(resolve, 1000))
    fs.readFile('REQUEST', 'utf-8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        console.log("reading data")
        console.log(data)
        res.json(data)
    })

})

app.listen(5000, () => {console.log("server start on port 5000")})




