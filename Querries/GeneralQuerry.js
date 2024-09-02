//This file will generate queries according to request
//Important Insights 
//1. If the first request in the Querry returns some error which dosn't stop the code ,
// the rest of the querries will also not work. 
//Function To Generate TimeStamps For The Querries

import { AllCustumersQuerryGenerator } from "./AllCustumers.js";

function getISODate(minutesAgo) {
    const date = new Date();
    date.setMinutes(date.getMinutes() - minutesAgo);

    // Format the date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Get the timezone offset in minutes and convert to hours and minutes
    const timezoneOffset = -date.getTimezoneOffset(); // in minutes
    const tzHours = String(Math.floor(Math.abs(timezoneOffset) / 60)).padStart(2, '0');
    const tzMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, '0');
    const tzSign = timezoneOffset >= 0 ? '+' : '-';

    // Combine the date and time components with the timezone offset
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${tzSign}${tzHours}:${tzMinutes}`;
}

const MinutesAgo = getISODate(1580);
const now = getISODate(0);
//Querry Generator for fetching all the modified or creation Details
const GeneralQuerryGenerator = ()=>{   
    let xmlQuerry =`<CustomerQueryRq>
        <FromModifiedDate>${MinutesAgo}</FromModifiedDate>
        <ToModifiedDate>${now}</ToModifiedDate>
        </CustomerQueryRq>
        <InvoiceQueryRq>
        <ModifiedDateRangeFilter>
        <FromModifiedDate>${MinutesAgo}</FromModifiedDate>
        <ToModifiedDate>${now}</ToModifiedDate>
        </ModifiedDateRangeFilter>
        </InvoiceQueryRq>
        <InventoryAdjustmentQueryRq>
        <ModifiedDateRangeFilter>
        <FromModifiedDate>${MinutesAgo}</FromModifiedDate>
        <ToModifiedDate>${now}</ToModifiedDate>
        </ModifiedDateRangeFilter>
        </InventoryAdjustmentQueryRq>
        <ItemQueryRq>
        <FromModifiedDate>${MinutesAgo}</FromModifiedDate>
        <ToModifiedDate>${now}</ToModifiedDate>
        </ItemQueryRq>
        <ItemInventoryQueryRq>
        <FromModifiedDate>${MinutesAgo}</FromModifiedDate>
        <ToModifiedDate>${now}</ToModifiedDate>
        </ItemInventoryQueryRq>
        `
         xmlQuerry+=AllCustumersQuerryGenerator()
        return xmlQuerry
}

export {
    GeneralQuerryGenerator,
    getISODate
};