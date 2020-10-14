import mongo from "../services/mongo"
import History from "../models/History"

export default {
    getAll: async function() {
        return mongo.getDb().collection("history").find({}).toArray();
    },

    getLast10: async function() {
        return mongo.getDb().collection("history").find({}).sort({timestamp: -1}).limit(10)
    },

    insert: async function (history: History) {
        return mongo.getDb().collection("history").insertOne({
            ...history
        })
    }
}