/**
 * Created by shenjj on 2017/2/9.
 */
let config = require('config-lite');
let mongoose = require('mongoose');

let mongoConnected = false;
class MongoUtil {
    constructor() {

    }

    connect() {
        console.log("mongoose start connect");
        mongoose.connect(config.mongodb);

        let db = mongoose.connection;
        db.on('error', () => {
            console.error.bind(console, 'connection error:');
            this.connect();
        });
        db.once('open', function (callback) {
            // yay!
            console.log("open db success");
            mongoConnected = true;
        });
    }

    checkConnected() {
        return mongoConnected;
    }

    createModel(modelName, schema, modelValue) {
        let modelSchema = mongoose.Schema(schema);

        let Model;
        try {
            Model = mongoose.model(modelName);                //判断Model是不是已存在
        } catch (error) {
            Model = mongoose.model(modelName, modelSchema);
        }

        let model = new Model(modelValue);
        // let promise = model.save();
        // return promise;
        return model.save();   //promise 返回model
        // return model.save(function (err, model) {
        //     if (err) {
        //         return console.error(err);
        //     } else {
        //         console.log(modelName + "save success" + model._id);
        //
        //     }
        // });
    }
}

module.exports = MongoUtil;