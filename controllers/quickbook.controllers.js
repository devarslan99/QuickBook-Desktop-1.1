
import xml2js from "xml2js"
import {XMLParser} from "fast-xml-parser"
import {sendDataToLambda} from "../utils/lambda.js"
import {querryGenerator} from "../utils/querry.js"
import { processCustomerData } from "../utils/DeleteCustumerCheckingAndUpdation.js"
import {awsdata, custumQuerry , isQuerryUpdated} from "../controllers/awsdata.controllers.js"
import { sendDataToDB } from "../db/sendData.js"
import { GeneralQuerryGenerator } from "../Querries/GeneralQuerry.js"
const parser = new xml2js.Parser({ explicitArray: false });
let sessionTicket = null;
let password=null
let DBdata = {}
let AWSQuerryFlag ;
const isAWSResquestAvailable =(flag)=>{
    AWSQuerryFlag = flag
}

const sendRequestsToQuickBook =(req, res) => {
    const xmlRequest = req.body;
    console.log('Received XML Request');
    // Handle Server Version request
    if (xmlRequest.includes('<serverVersion')) {
        console.log('Server Version Block')
        const response = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                    <serverVersionResponse xmlns="http://developer.intuit.com/">
                        <serverVersionResult>16.0</serverVersionResult>
                    </serverVersionResponse>
                </soap:Body>
            </soap:Envelope>`;
        res.set('Content-Type', 'text/xml');
        res.send(response);
    }
    // Handle Client Version request
    else if (xmlRequest.includes('<clientVersion')) {
        console.log('Client Version Block');
        const response = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                    <clientVersionResponse xmlns="http://developer.intuit.com/">
                        <clientVersionResult></clientVersionResult> <!-- No issue with the client version -->
                    </clientVersionResponse>
                </soap:Body>
            </soap:Envelope>`;
        res.set('Content-Type', 'text/xml');
        res.send(response);
    }
    // Handle Authentication request
    else if (xmlRequest.includes('<authenticate')) {
        console.log(xmlRequest);
        const regix = /<strPassword>([^<]+)<\/strPassword>/;
        const PasswordMatch = xmlRequest.match(regix);
        if(PasswordMatch){
            password = PasswordMatch[1]
        }
        console.log('Authentication Block, The Password is:',password);
        const response = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                    <authenticateResponse xmlns="http://developer.intuit.com/">
                        <authenticateResult>
                            <string>valid_ticket</string> <!-- Session Ticket -->
                            <string></string>  <!-- No error -->
                        </authenticateResult>
                    </authenticateResponse>
                </soap:Body>
            </soap:Envelope>`;
        sessionTicket = 'valid_ticket'; // Save session ticket for use in further requests
        res.set('Content-Type', 'text/xml');
        res.send(response);
    }
    // Handle sendRequestXML request
    else if (xmlRequest.includes('<sendRequestXML')) {
        console.log('Handling sendRequestXML block');
        
        // Extract the session ticket from the request
        const ticketMatch = xmlRequest.match(/<ticket>([^<]+)<\/ticket>/);
        const ticket = ticketMatch ? ticketMatch[1] : '';
        if (ticket === sessionTicket) {
            
               let querry =``
               if(AWSQuerryFlag){
                querry=custumQuerry
               }else{
                querry= GeneralQuerryGenerator()
               }
            const responseXmlFormatted = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
            <soap:Body>
                <sendRequestXMLResponse xmlns="http://developer.intuit.com/">
                    <sendRequestXMLResult>
                        <![CDATA[
                            <?qbxml version="16.0"?>
                            <QBXML>
                                <QBXMLMsgsRq onError="stopOnError">
                                ${querry}
                                </QBXMLMsgsRq>
                            </QBXML>
                        ]]>
                    </sendRequestXMLResult>
                </sendRequestXMLResponse>
            </soap:Body>
        </soap:Envelope>`;
            console.log(responseXmlFormatted);
            res.setHeader('Content-Type', 'text/xml');
            res.send(responseXmlFormatted);
        } else {
            console.log('Invalid ticket');
            res.status(403).send('Invalid session ticket');
        }
    }
    
    // Handle the receiveResponseXML request for the actual response data
    else if (xmlRequest.includes('<receiveResponseXML')) {
        console.log('Handling receiveResponseXML block');
            AWSQuerryFlag= false
            // isQuerryUpdated(true)
          parser.parseString(xmlRequest, (err, result) => {
            if (err) {
              console.error("Error parsing SOAP response:", err);
              return;
            }
          
            const embeddedXML = result['soap:Envelope']['soap:Body']['receiveResponseXML']['response'];
            
            // Convert HTML encoded XML to normal XML
            const unescapedXML = embeddedXML.replace(`/&lt;/g`, "<").replace(`/&gt;/g`, ">").replace(`/&apos;/g`, "'").replace(`/&quot;/g`, '"').replace(`/&amp;/g`, "&");
          
            // Step 2: Parse the embedded QBXML
            const qbxmlParser = new XMLParser();
            const qbxmlResult = qbxmlParser.parse(unescapedXML);
            // console.log(qbxmlResult?.QBXML?.QBXMLMsgsRs);
            //We will check for QBXMLMsgs for three things Custumer , Invoice , Inventory
            //After that we will add the relevent dat in the DB dat with a type define either it is custumer or Invoice or Inventory
            //Based on the type we will hit AWS endpoints and send only relevent type data with doc id and password to that endpoint
            // const recievedData = qbxmlResult?.QBXML?.QBXMLMsgsRs.CustomerQueryRs.CustomerRet
        const recievedData = qbxmlResult?.QBXML?.QBXMLMsgsRs
        console.log(qbxmlResult?.QBXML?.QBXMLMsgsRs);
        const allCustumersData = qbxmlResult?.QBXML?.QBXMLMsgsRs.CustomerQueryRs[1].CustomerRet
        if(allCustumersData){
            processCustomerData(allCustumersData)
        }
        sendDataToLambda(recievedData,password)
            // if(Array.isArray(recievedData)){
            //     const data = Object.assign({}, recievedData.map(item => item))
            //     DBdata={
            //         password,
            //         data
            //     }
            // }
            // else{
            //     DBdata={
            //         password,
            //         data
            //     }
            // }
            // console.log('the data recieved',recievedData);
            // console.log('the data generated for DB',DBdata);
            // if(recievedData!=null){
            //     sendDataToDB(DBdata)
            // }

          });
        // Normally, you would extract the response data from QuickBooks and process it
        const response = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                    <receiveResponseXMLResponse xmlns="http://developer.intuit.com/">
                        <receiveResponseXMLResult>100</receiveResponseXMLResult> <!-- Indicating the percentage of work done -->
                    </receiveResponseXMLResponse>
                </soap:Body>
            </soap:Envelope>`;
        res.set('Content-Type', 'text/xml');
        res.send(response);
    }
    else if (xmlRequest.includes('<closeConnection')) {
        console.log('Connection Close Block');
        const response = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
                <closeConnectionResponse xmlns="http://developer.intuit.com/">
                    <closeConnectionResult>Successfully closed connection</closeConnectionResult>
                </closeConnectionResponse>
            </soap:Body>
        </soap:Envelope>
        `;
        res.set('Content-Type', 'text/xml');
        res.send(response);
    }
    else{
        // Fallback for unknown requests
        console.log('Else Block - Unknown request');
        const response = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                    <errorResponse xmlns="http://developer.intuit.com/">
                        <errorResult>
                            <string>Unknown request</string>
                        </errorResult>
                    </errorResponse>
                </soap:Body>
            </soap:Envelope>`;
        res.set('Content-Type', 'text/xml');
        res.status(400).send(response);
    }
}


// Function to parse the nesting of the Object 

export default sendRequestsToQuickBook
export {
    isAWSResquestAvailable
}
