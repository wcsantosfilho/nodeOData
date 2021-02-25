var http = require('http');
var Datastore = require('nedb');
var db = new Datastore( { inMemoryOnly: true });
var ODataServer = require('simple-odata-server');
var Adapter = require('simple-odata-server-nedb');
const PORT = process.env.PORT || 5000
 
var model = {
    namespace: "jsreport",
    entityTypes: {
        "ReasonType": {
            "_id": {"type": "Edm.String", key: true},
            "reason": {"type": "Edm.String"},
            "description": {"type": "Edm.String"},
        }
    },   
    entitySets: {
        "reasons": {
            entityType: "jsreport.ReasonType"
        }
    }
};
 
var odataServer = ODataServer("https://vast-caverns-44119.herokuapp.com")
    .model(model)
    .adapter(Adapter(function(es, cb) { cb(null, db)}));
 
 
http.createServer(odataServer.handle.bind(odataServer)).listen(PORT, () => console.log(`Listening on ${PORT}`));