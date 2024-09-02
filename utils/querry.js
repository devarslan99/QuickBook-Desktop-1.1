//This file will generate queries according to request
//Important Insights 
//1. If the first request in the Querry returns some error which dosn't stop the code ,
// the rest of the querries will also not work. 
//Function To Generate TimeStamps For The Querries

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

const MinutesAgo = getISODate(2880);
const now = getISODate(0);
//Querry Generator for fetching all the modified or creation Details
const querryGenerator = ()=>{
      
       /* ` <CustomerQueryRq>
        <NameFilter>
        <MatchCriterion>StartsWith</MatchCriterion>
        <Name>Wilks, Daniel</Name>
      </NameFilter>
        <IncludeRetElement>ListID</IncludeRetElement>
        <IncludeRetElement>Name</IncludeRetElement>
        <IncludeRetElement>FullName</IncludeRetElement>
        <IncludeRetElement>TimeCreated</IncludeRetElement>
        <IncludeRetElement>TimeModified</IncludeRetElement>
        <IncludeRetElement>EditSequence</IncludeRetElement>
        <IncludeRetElement>IsActive</IncludeRetElement>
        <IncludeRetElement>ClassRef</IncludeRetElement>
        <IncludeRetElement>ParentRef</IncludeRetElement>
        <IncludeRetElement>Sublevel</IncludeRetElement>
        <IncludeRetElement>CompanyName</IncludeRetElement>
        <IncludeRetElement>Salutation</IncludeRetElement>
        <IncludeRetElement>FirstName</IncludeRetElement>
        <IncludeRetElement>MiddleName</IncludeRetElement>
        <IncludeRetElement>LastName</IncludeRetElement>
        <IncludeRetElement>JobTitle</IncludeRetElement>
        <IncludeRetElement>BillAddress</IncludeRetElement>
        <IncludeRetElement>ShipAddress</IncludeRetElement>
        <IncludeRetElement>ShipToAddress</IncludeRetElement>
        <IncludeRetElement>Phone</IncludeRetElement>
        <IncludeRetElement>AltPhone</IncludeRetElement>
        <IncludeRetElement>Fax</IncludeRetElement>
        <IncludeRetElement>Email</IncludeRetElement>
        <IncludeRetElement>Cc</IncludeRetElement>
        <IncludeRetElement>Contact</IncludeRetElement>
        <IncludeRetElement>AltContact</IncludeRetElement>
        <IncludeRetElement>AdditionalContactRef</IncludeRetElement>
        <IncludeRetElement>ContactsRet</IncludeRetElement>
        <IncludeRetElement>CustomerTypeRef</IncludeRetElement>
        <IncludeRetElement>TermsRef</IncludeRetElement>
        <IncludeRetElement>SalesRepRef</IncludeRetElement>
        <IncludeRetElement>Balance</IncludeRetElement>
        <IncludeRetElement>TotalBalance</IncludeRetElement>
        <IncludeRetElement>SalesTaxCodeRef</IncludeRetElement>
        <IncludeRetElement>ItemSalesTaxRef</IncludeRetElement>
        <IncludeRetElement>SalesTaxCountry</IncludeRetElement>
        <IncludeRetElement>ResaleNumber</IncludeRetElement>
        <IncludeRetElement>AccountNumber</IncludeRetElement>
        <IncludeRetElement>CreditLimit</IncludeRetElement>
        <IncludeRetElement>PreferredPaymentMethodRef</IncludeRetElement>
        <IncludeRetElement>CreditCardInfo</IncludeRetElement>
        <IncludeRetElement>JobStatus</IncludeRetElement>
        <IncludeRetElement>JobStartDate</IncludeRetElement>
        <IncludeRetElement>JobProjectedEndDate</IncludeRetElement>
        <IncludeRetElement>JobEndDate</IncludeRetElement>
        <IncludeRetElement>JobDesc</IncludeRetElement>
        <IncludeRetElement>JobTypeRef</IncludeRetElement>
        <IncludeRetElement>Notes</IncludeRetElement>
        <IncludeRetElement>AdditionalNotesRet</IncludeRetElement>
        <IncludeRetElement>PreferredDeliveryMethod</IncludeRetElement>
        <IncludeRetElement>PriceLevelRef</IncludeRetElement>
        <IncludeRetElement>ExternalGUID</IncludeRetElement>
        <IncludeRetElement>TaxRegistrationNumber</IncludeRetElement>
        <IncludeRetElement>CurrencyRef</IncludeRetElement>
        <IncludeRetElement>DataExtRet</IncludeRetElement>
      </CustomerQueryRq>`    */    
      return `<CustomerQueryRq>
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
    

}

export {
    querryGenerator,
    getISODate
};