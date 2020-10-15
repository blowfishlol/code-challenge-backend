import mongo from "../services/MongoService"
import History from "../models/History"

export default {

    getAll: async function() : Promise<History[]>  {
        let results = await mongo.getDb().collection("history").find({}).toArray();
        return results.map(r => new History(r.command, r.result, r.timestamp))
    },

    getLast10: async function() : Promise<History[]> {
        let results = await mongo.getDb().collection("history").find({}).sort({timestamp: -1}).limit(10).toArray();
        return results.map(r => new History(r.command, r.result, r.timestamp))
    },

    insert: async function (history: History) {
        return mongo.getDb().collection("history").insertOne({
            ...history
        })
    }
}