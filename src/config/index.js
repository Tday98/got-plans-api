import mongodb from 'mongodb';

export default {
  //"port": 3005,
  //"mongoUrl": "mongodb://localhost:27017/got-plans",
  "port": process.env.PORT,
  "mongoUrl": "mongodb://tristand:12345@ds237855.mlab.com:37855/got-plans",
  "bodyLimit": "100kb"
}
