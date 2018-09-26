const express = require('express');
const expressStatusMonitor = require('express-status-monitor');
const compression = require('compression');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
const chalk = require('chalk');

const mainView = require('./views/main');

const app = express();
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.use(expressStatusMonitor());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
app.use(methodOverride());

app.get('/', (req, res) => {
    res.send('test');
});

app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('Press CTRL-C to stop\n');
});

module.exports = app;