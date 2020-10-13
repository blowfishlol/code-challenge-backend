/*
import {MongoClient} from 'mongodb'

const uri = `mongodb://localhost:27017`

const client = new MongoClient(uri,{ useUnifiedTopology: true } )

client.connect().then((a) =>{
    let result = a.db("calculator_history").collection("history").find()
    console.log(result)
})


*/