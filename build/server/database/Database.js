"use strict";
// Copyright 2020 Fraser
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = exports.connect = void 0;
const Mongoose = require("mongoose");
let database;
exports.connect = () => {
    const uri = "mongodb://localhost:27017";
    const dbName = "quinzical";
    if (database) {
        return;
    }
    Mongoose.connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        dbName: dbName,
    });
    database = Mongoose.connection;
    database.once("open", async () => {
        console.log("Database Connection Established");
    });
    database.on("error", () => {
        console.warn("Error connecting to database");
    });
    return;
};
exports.disconnect = () => {
    if (!database) {
        return;
    }
    Mongoose.disconnect();
    console.log("Closed database");
};
//# sourceMappingURL=Database.js.map