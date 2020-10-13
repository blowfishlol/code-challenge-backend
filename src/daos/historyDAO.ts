import mongo from "../services/mongo"

export default {
    getAllHistory: async function() {
        return mongo.getDb().collection("history").find({}).toArray();
    },

    getLast10: async function() {
        return mongo.getDb().collection("history").find({}).sort({timestamp: -1}).limit(10)
    }
}