import express from 'express';
import * as bodyParser from 'body-parser';
import {connect} from './db/db';

connect();

const app = express();
app.use(bodyParser.json({
    limit: '25mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));

export {app};