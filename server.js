import express from "express"
import bodyParser from "body-parser";
import sendRequestsToQuickBook from "./controllers/quickbook.controllers.js";
import {awsdata} from "./controllers/awsdata.controllers.js";
import connectDB from "./db/index.js";


const app = express();
const port = 3000;

//Middleware to parse XML requests
app.use(bodyParser.text({ type: 'text/xml',limit: '10mb' }));
app.use(express.json());
//Connecting Databse
connectDB();
// Handle POST requests from the Web Connector
app.post('/qbws', sendRequestsToQuickBook );

app.post('/awsdata',awsdata)
// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${3000}`);
});
