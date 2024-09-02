
import axios from "axios";

// Replace with your API Gateway URL
const apiUrl = 'https://vpun5qki39.execute-api.eu-north-1.amazonaws.com/prod/quickbookdata';

// Data to send to Lambda

// Function to send data to Lambda
 const sendDataToLambda = async (QBData,password) => {
    const parsedData = {};
// Normalize and extract Customer Data
if (QBData.CustomerQueryRs[0]) {
  let DBdata=null;
  const custumerData =QBData.CustomerQueryRs[0].CustomerRet
    console.log('Generating the Custumer Document and Sending It to DB and AWS');
    if(Array.isArray(custumerData)){
          const data = Object.assign({}, custumerData.map(item => item))
          DBdata={
              password,
              data,
              type:"CustomerRet"
          }
      }
      else{
          DBdata={
              password,
              data
          }
        }
  // const customers = QBData.CustomerQueryRs.CustomerRet;
  // parsedData.customers = Array.isArray(customers) ? customers : [customers];
  // parsedData.customers = parsedData.customers.map(customer => ({
  //  pasword:'bashir',
  //  ...customer
  // }));
}

// Normalize and extract Invoice Data (if applicable)
if (QBData.InvoiceQueryRs) {
    console.log('Parsing the Invoice Data');
  // Assuming there would be similar objects for invoices if they existed
  parsedData.invoices = QBData.InvoiceQueryRs; // Replace with actual invoice parsing logic
}

// Normalize and extract Inventory Data
if (QBData.ItemQueryRs) {
    console.log('Parsing the ItemInventory Data');
  const inventoryItems = QBData.ItemQueryRs.ItemServiceRet;
  parsedData.inventoryItems = Array.isArray(inventoryItems) ? inventoryItems : [inventoryItems];
  parsedData.inventoryItems = parsedData.inventoryItems.map(item => ({
    id: item.ListID,
    name: item.Name,
    quantityOnHand: item.QuantityOnHand
  }));
}

 console.log(parsedData);
if (parsedData.customers && parsedData.customers.length > 0) {
    try {
        console.log('Sending Customer Data',parsedData.customers);
        const response = await axios.post(`${apiUrl}/custumer`,{...parsedData.customers},{
            headers: {
              'Content-Type': 'application/json'
            }
          } );
        console.log('Response from Lambda (Customer):', response.data);
    } catch (error) {
        console.error('Error sending customer data to Lambda');
    }
}

// Check if invoice data exists and send to the /invoice route
if (QBData.invoices && QBData.invoices.length > 0) {
    try {
        console.log('Sending Invoice Data',invoices);
        const response = await axios.post(`${apiUrl}/invoice`,parsedData.invoices);
        console.log('Response from Lambda (Invoice):', response.data);
    } catch (error) {
        console.error('Error sending invoice data to Lambda:', error);
    }
}

// Check if inventory data exists and send to the /inventory route
if (parsedData.inventoryItems && parsedData.inventoryItems.length > 0) {
    try {
    
        console.log('Sending Inventory Data',parsedData.inventoryItems);
        const response = await axios.post(`${apiUrl}/Inventory`,parsedData.inventoryItems);
        console.log('Response from Lambda (Inventory):', response.data);
    } catch (error) {
        console.error('Error sending inventory data to Lambda:',error);
    }
}
};

export {
  sendDataToLambda
}


