import os from 'node:os';
import http from 'node:http'
import express from 'express';
import throng from 'throng';
import routes from './routes/index.js'

const WORKERS = process.env.WEB_CONCURRENCY || os.cpus().length;
process.env.ENABLE_CLUSTERS ? throng({ workers: WORKERS, lifetime: Infinity }, startApp) : startApp();


function startApp() {
    const app = express();

    var PORT = process.env.PORT || '3000';
    app.set('port', PORT);
    app.use('/', routes);

  
    var server = http.createServer(app);
  
    /**
     * Listen on provided port, on all network interfaces.
     */
  
    server.listen(PORT, '0.0.0.0', () => console.log('Express server listening on port ' + server.address().port));
}
