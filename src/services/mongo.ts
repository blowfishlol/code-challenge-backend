import {Db, MongoClient} from 'mongodb'

const uri = `mongodb://localhost:27017`

class MongoService {

    client: MongoClient
    _ready: boolean

    constructor() {
        this._ready = false
        const uri = `mongodb://localhost:27017`
        this.client = new MongoClient(uri,{ useUnifiedTopology: true } )
    }

    async init() {
        await this.client.connect()
        this._ready = true
    }

    getDb() : Db {
        if(!this._ready) {
            throw new Error("Connection not ready!")
        }
        return this.client.db("calculator_history")
    }

}


export default new MongoService()