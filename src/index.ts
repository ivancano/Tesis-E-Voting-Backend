import express, { Application, Request, Response } from "express";
import cors from "cors";
import routes from './routes';
import path from "path";

const app: Application = express();
const port = 8080; // default port to listen

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.static('tmp'))

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

app.use('/api/v1', routes)

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
