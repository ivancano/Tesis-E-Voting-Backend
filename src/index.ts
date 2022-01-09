import express, { Application, Request, Response } from "express";
import cors from "cors";
import { readFileSync } from 'fs';
import * as https from 'https';
import routes from './routes';

const app: Application = express();
const port = 8080; // default port to listen

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

const options = {
    key: readFileSync('./selfsigned.crt'),
    cert: readFileSync('./selfsigned.key'),
};

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

app.use('/api/v1', routes)

// start the Express server
https.createServer(options, app).listen(port , () => {
    console.log("Express server listening on port " + port);
});
