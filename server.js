var appJs = require('./app.js');

appJs.applicationObject.set('port', process.env.port || 3001);
