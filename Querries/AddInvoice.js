
const AddInvoiceQuerryGenerator = (body)=>{
    let xmlQuery = ``;

    const {
      CustomerRef,
      TxnDate,
      RefNumber,
      BillAddress,
      ShipAddress,
      IsPending,
      PONumber,
      TermsRef,
      DueDate,
      SalesRepRef,
      FOB,
      ShipDate,
      ShipMethodRef,
      ItemSalesTaxRef,
      Memo,
      CustomerMsgRef,
      IsToBePrinted,
      IsToBeEmailed,
      IsTaxIncluded,
      CustomerSalesTaxCodeRef,
      DepositToAccountRef,
      InvoiceLineAdd,
      InvoiceLineGroupAdd,
      ExternalGUID,
      CurrencyRef,
    } = body;
    
    // Add required fields for adding an invoice
    if (!CustomerRef || !InvoiceLineAdd || InvoiceLineAdd.length === 0) {
      return res.status(400).json({ error: "CustomerRef and at least one InvoiceLineAdd are required" });
    }
    
    xmlQuery = `<InvoiceAddRq>
        <InvoiceAdd>`;
    
    if (CustomerRef) {
      xmlQuery += `<CustomerRef>
        ${CustomerRef.ListID ? `<ListID>${CustomerRef.ListID}</ListID>` : ""}
        ${CustomerRef.FullName ? `<FullName>${CustomerRef.FullName}</FullName>` : ""}
      </CustomerRef>`;
    }
    
    if (TxnDate) xmlQuery += `<TxnDate>${TxnDate}</TxnDate>`;
    if (RefNumber) xmlQuery += `<RefNumber>${RefNumber}</RefNumber>`;
    
    if (BillAddress) {
      xmlQuery += `<BillAddress>
        ${BillAddress.Addr1 ? `<Addr1>${BillAddress.Addr1}</Addr1>` : ""}
        ${BillAddress.Addr2 ? `<Addr2>${BillAddress.Addr2}</Addr2>` : ""}
        ${BillAddress.Addr3 ? `<Addr3>${BillAddress.Addr3}</Addr3>` : ""}
        ${BillAddress.Addr4 ? `<Addr4>${BillAddress.Addr4}</Addr4>` : ""}
        ${BillAddress.Addr5 ? `<Addr5>${BillAddress.Addr5}</Addr5>` : ""}
        ${BillAddress.City ? `<City>${BillAddress.City}</City>` : ""}
        ${BillAddress.State ? `<State>${BillAddress.State}</State>` : ""}
        ${
          BillAddress.PostalCode
            ? `<PostalCode>${BillAddress.PostalCode}</PostalCode>`
            : ""
        }
        ${BillAddress.Country ? `<Country>${BillAddress.Country}</Country>` : ""}
        ${BillAddress.Note ? `<Note>${BillAddress.Note}</Note>` : ""}
      </BillAddress>`;
    }
    
    if (ShipAddress) {
      xmlQuery += `<ShipAddress>
        ${ShipAddress.Addr1 ? `<Addr1>${ShipAddress.Addr1}</Addr1>` : ""}
        ${ShipAddress.Addr2 ? `<Addr2>${ShipAddress.Addr2}</Addr2>` : ""}
        ${ShipAddress.Addr3 ? `<Addr3>${ShipAddress.Addr3}</Addr3>` : ""}
        ${ShipAddress.Addr4 ? `<Addr4>${ShipAddress.Addr4}</Addr4>` : ""}
        ${ShipAddress.Addr5 ? `<Addr5>${ShipAddress.Addr5}</Addr5>` : ""}
        ${ShipAddress.City ? `<City>${ShipAddress.City}</City>` : ""}
        ${ShipAddress.State ? `<State>${ShipAddress.State}</State>` : ""}
        ${
          ShipAddress.PostalCode
            ? `<PostalCode>${ShipAddress.PostalCode}</PostalCode>`
            : ""
        }
        ${ShipAddress.Country ? `<Country>${ShipAddress.Country}</Country>` : ""}
        ${ShipAddress.Note ? `<Note>${ShipAddress.Note}</Note>` : ""}
      </ShipAddress>`;
    }
    
    if (IsPending !== undefined) xmlQuery += `<IsPending>${IsPending}</IsPending>`;
    if (PONumber) xmlQuery += `<PONumber>${PONumber}</PONumber>`;
    
    if (TermsRef) {
      xmlQuery += `<TermsRef>
        ${TermsRef.ListID ? `<ListID>${TermsRef.ListID}</ListID>` : ""}
        ${TermsRef.FullName ? `<FullName>${TermsRef.FullName}</FullName>` : ""}
      </TermsRef>`;
    }
    
    if (DueDate) xmlQuery += `<DueDate>${DueDate}</DueDate>`;
    
    if (SalesRepRef) {
      xmlQuery += `<SalesRepRef>
        ${SalesRepRef.ListID ? `<ListID>${SalesRepRef.ListID}</ListID>` : ""}
        ${
          SalesRepRef.FullName
            ? `<FullName>${SalesRepRef.FullName}</FullName>`
            : ""
        }
      </SalesRepRef>`;
    }
    
    if (FOB) xmlQuery += `<FOB>${FOB}</FOB>`;
    if (ShipDate) xmlQuery += `<ShipDate>${ShipDate}</ShipDate>`;
    
    if (ShipMethodRef) {
      xmlQuery += `<ShipMethodRef>
        ${ShipMethodRef.ListID ? `<ListID>${ShipMethodRef.ListID}</ListID>` : ""}
        ${
          ShipMethodRef.FullName
            ? `<FullName>${ShipMethodRef.FullName}</FullName>`
            : ""
        }
      </ShipMethodRef>`;
    }
    
    if (ItemSalesTaxRef) {
      xmlQuery += `<ItemSalesTaxRef>
        ${
          ItemSalesTaxRef.ListID
            ? `<ListID>${ItemSalesTaxRef.ListID}</ListID>`
            : ""
        }
        ${
          ItemSalesTaxRef.FullName
            ? `<FullName>${ItemSalesTaxRef.FullName}</FullName>`
            : ""
        }
      </ItemSalesTaxRef>`;
    }
    
    if (Memo) xmlQuery += `<Memo>${Memo}</Memo>`;
    
    if (CustomerMsgRef) {
      xmlQuery += `<CustomerMsgRef>
        ${CustomerMsgRef.ListID ? `<ListID>${CustomerMsgRef.ListID}</ListID>` : ""}
        ${
          CustomerMsgRef.FullName
            ? `<FullName>${CustomerMsgRef.FullName}</FullName>`
            : ""
        }
      </CustomerMsgRef>`;
    }
    
    if (IsToBePrinted !== undefined) {
      xmlQuery += `<IsToBePrinted>${IsToBePrinted}</IsToBePrinted>`;
    }
    
    if (IsToBeEmailed !== undefined) {
      xmlQuery += `<IsToBeEmailed>${IsToBeEmailed}</IsToBeEmailed>`;
    }
    
    if (IsTaxIncluded !== undefined) {
      xmlQuery += `<IsTaxIncluded>${IsTaxIncluded}</IsTaxIncluded>`;
    }
    
    if (CustomerSalesTaxCodeRef) {
      xmlQuery += `<CustomerSalesTaxCodeRef>
        ${
          CustomerSalesTaxCodeRef.ListID
            ? `<ListID>${CustomerSalesTaxCodeRef.ListID}</ListID>`
            : ""
        }
        ${
          CustomerSalesTaxCodeRef.FullName
            ? `<FullName>${CustomerSalesTaxCodeRef.FullName}</FullName>`
            : ""
        }
      </CustomerSalesTaxCodeRef>`;
    }
    
    if (DepositToAccountRef) {
      xmlQuery += `<DepositToAccountRef>
        ${
          DepositToAccountRef.ListID
            ? `<ListID>${DepositToAccountRef.ListID}</ListID>`
            : ""
        }
        ${
          DepositToAccountRef.FullName
            ? `<FullName>${DepositToAccountRef.FullName}</FullName>`
            : ""
        }
      </DepositToAccountRef>`;
    }
    
    // Handling Invoice Line Items
if (InvoiceLineAdd && Array.isArray(InvoiceLineAdd)) {
    InvoiceLineAdd.forEach((line) => {
      xmlQuery += `<InvoiceLineAdd>
        ${
          line.ItemRef
            ? `<ItemRef>
                ${line.ItemRef.ListID ? `<ListID>${line.ItemRef.ListID}</ListID>` : ""}
                ${line.ItemRef.FullName ? `<FullName>${line.ItemRef.FullName}</FullName>` : ""}
              </ItemRef>`
            : ""
        }
        ${line.Desc ? `<Desc>${line.Desc}</Desc>` : ""}
        ${line.Quantity ? `<Quantity>${line.Quantity}</Quantity>` : ""}
        ${line.Rate ? `<Rate>${line.Rate}</Rate>` : ""}
        ${line.Amount ? `<Amount>${line.Amount}</Amount>` : ""}
        ${line.TaxCodeRef ? `<TaxCodeRef>${line.TaxCodeRef}</TaxCodeRef>` : ""}
      </InvoiceLineAdd>`;
    }); // Closing forEach loop for InvoiceLineAdd
  }
  
  // Handling Invoice Line Group Add
  if (InvoiceLineGroupAdd && Array.isArray(InvoiceLineGroupAdd)) {
    InvoiceLineGroupAdd.forEach((group) => {
      // Opening the InvoiceLineGroupAdd tag
      xmlQuery += `<InvoiceLineGroupAdd>
        ${
          group.ItemGroupRef
            ? `<ItemGroupRef>
                ${group.ItemGroupRef.ListID ? `<ListID>${group.ItemGroupRef.ListID}</ListID>` : ""}
                ${group.ItemGroupRef.FullName ? `<FullName>${group.ItemGroupRef.FullName}</FullName>` : ""}
              </ItemGroupRef>`
            : ""
        }
        ${group.Quantity ? `<Quantity>${group.Quantity}</Quantity>` : ""}`;
  
      // Adding each InvoiceLineAdd inside the group
      if (group.InvoiceLineAdd && Array.isArray(group.InvoiceLineAdd)) {
        group.InvoiceLineAdd.forEach((line) => {
          xmlQuery += `
            <InvoiceLineAdd>
              ${
                line.ItemRef
                  ? `<ItemRef>
                      ${line.ItemRef.ListID ? `<ListID>${line.ItemRef.ListID}</ListID>` : ""}
                      ${line.ItemRef.FullName ? `<FullName>${line.ItemRef.FullName}</FullName>` : ""}
                    </ItemRef>`
                  : ""
              }
              ${line.Desc ? `<Desc>${line.Desc}</Desc>` : ""}
              ${line.Quantity ? `<Quantity>${line.Quantity}</Quantity>` : ""}
              ${line.Rate ? `<Rate>${line.Rate}</Rate>` : ""}
              ${line.Amount ? `<Amount>${line.Amount}</Amount>` : ""}
              ${line.TaxCodeRef ? `<TaxCodeRef>${line.TaxCodeRef}</TaxCodeRef>` : ""}
            </InvoiceLineAdd>`;
        }); // Closing forEach loop for InvoiceLineAdd inside InvoiceLineGroupAdd
      }
  
      // Closing the InvoiceLineGroupAdd tag
      xmlQuery += `</InvoiceLineGroupAdd>`;
    }); // Closing forEach loop for InvoiceLineGroupAdd
  }

// Handling ExternalGUID
if (ExternalGUID) {
  xmlQuery += `<ExternalGUID>${ExternalGUID}</ExternalGUID>`;
}

// Handling CurrencyRef
if (CurrencyRef) {
  xmlQuery += `<CurrencyRef>
    ${CurrencyRef.ListID ? `<ListID>${CurrencyRef.ListID}</ListID>` : ""}
    ${CurrencyRef.FullName ? `<FullName>${CurrencyRef.FullName}</FullName>` : ""}
  </CurrencyRef>`;
}

// Close the InvoiceAdd element and request
xmlQuery += `</InvoiceAdd>
</InvoiceAddRq>`;

return xmlQuery;
}

export{
    AddInvoiceQuerryGenerator
}