const express = require('express');
const Datastore = require('nedb');
const ODataServer = require('simple-odata-server');
const Adapter = require('simple-odata-server-nedb');
const app = express();
const PORT = process.env.PORT || 5000
var db = new Datastore( { inMemoryOnly: true });

var model = {
    namespace: "ExternalData",
    entityTypes: {
        "Reason": {
            "_id": {"type": "Edm.String", key: true},
            "reason": {"type": "Edm.String"},
            "description": {"type": "Edm.String"},
        },
        "Realty": {
            "_id": {"type": "Edm.String", key: true},
            "use": {"type": "Edm.String"},
            "registered": {"type": "Edm.Boolean"},
            "finality": {"type": "Edm.String"},
        }
    },   
    entitySets: {
        "Reason": {
            entityType: "ExternalData.Reason"
        },
        "Realty": {
            entityType: "ExternalData.Realty"
        }
    }
};
 
var odataServer = ODataServer()
    .model(model)
    .cors('*')
    .adapter(Adapter(function(es, cb) { cb(null, db)}));

app.use("/odata", function (req, res) {
    odataServer.handle(req, res);
});

app.listen(PORT, () => console.log(`Listning on ${PORT}`));