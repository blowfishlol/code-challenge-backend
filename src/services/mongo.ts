import {Db, MongoClient} from 'mongodb'

let uri = "mongodb://";
if(process.env.DB_USERNAME && process.env.DB_PASSWORD) {
    uri = `${uri}${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_ADDRESS}/${process.env.DB_NAME}`
} else {
    uri = `${uri}${process.env.DB_ADDRESS}/${process.env.DB_NAME}`
}

class MongoService {

    client: MongoClient;
    _ready: boolean;

    constructor() {
        this._ready = false;
        this.client = new MongoClient(uri,{ useUnifiedTopology: true } );
    }

    async init() {
        console.log(uri)
        await this.client.connect();
        this._ready = true;
    }

    getDb() : Db {
        if(!this._ready) {
            throw new Error("Connection not ready!");
        }
        return this.client.db(process.env.DB_NAME);
    }

}


export default new MongoService();