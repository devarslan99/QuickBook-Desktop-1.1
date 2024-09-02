
const ModInvoiceQuerryGenerator = (body) =>{
    let xmlQuery = ``;
    const {
        ListID,
        EditSequence,
        CustomerRef,
        TemplateRef,
        TxnDate,
        RefNumber,
        BillAddress,
        ShipAddress,
        IsActive,
        TermsRef,
        DueDate,
        SalesRepRef,
        OpenBalance,
        TotalAmount,
        ItemSalesTaxRef,
        SalesTaxCodeRef,
        ItemRef,
        Quantity,
        Rate,
        Amount,
        Description,
        AccountRef,
        ClassRef,
        Memo,
        Shipping,
        PreferredDeliveryMethod,
        ExternalGUID,
        CurrencyRef,
        PaymentMethodRef,
        CustomFieldList
    } = body;

    // Add required fields for modification
    if (!ListID || !EditSequence) {
        return { error: "ListID and EditSequence are required" };
    }
    xmlQuery = `<InvoiceModRq>
        <InvoiceMod>
          <ListID>${ListID}</ListID>
          <EditSequence>${EditSequence}</EditSequence>`;

    // Add optional fields dynamically
    if (CustomerRef) {
        xmlQuery += `<CustomerRef>
        ${CustomerRef.ListID ? `<ListID>${CustomerRef.ListID}</ListID>` : ""}
        ${CustomerRef.FullName ? `<FullName>${CustomerRef.FullName}</FullName>` : ""}
      </CustomerRef>`;
    }

    if (TemplateRef) {
        xmlQuery += `<TemplateRef>
        ${TemplateRef.ListID ? `<ListID>${TemplateRef.ListID}</ListID>` : ""}
        ${TemplateRef.FullName ? `<FullName>${TemplateRef.FullName}</FullName>` : ""}
      </TemplateRef>`;
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
        ${BillAddress.PostalCode ? `<PostalCode>${BillAddress.PostalCode}</PostalCode>` : ""}
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
        ${ShipAddress.PostalCode ? `<PostalCode>${ShipAddress.PostalCode}</PostalCode>` : ""}
        ${ShipAddress.Country ? `<Country>${ShipAddress.Country}</Country>` : ""}
        ${ShipAddress.Note ? `<Note>${ShipAddress.Note}</Note>` : ""}
      </ShipAddress>`;
    }

    if (IsActive !== undefined) xmlQuery += `<IsActive>${IsActive}</IsActive>`;

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
        ${SalesRepRef.FullName ? `<FullName>${SalesRepRef.FullName}</FullName>` : ""}
      </SalesRepRef>`;
    }
    
    if (OpenBalance) xmlQuery += `<OpenBalance>${OpenBalance}</OpenBalance>`;
    if (TotalAmount) xmlQuery += `<TotalAmount>${TotalAmount}</TotalAmount>`;

    if (ItemSalesTaxRef) {
        xmlQuery += `<ItemSalesTaxRef>
        ${ItemSalesTaxRef.ListID ? `<ListID>${ItemSalesTaxRef.ListID}</ListID>` : ""}
        ${ItemSalesTaxRef.FullName ? `<FullName>${ItemSalesTaxRef.FullName}</FullName>` : ""}
      </ItemSalesTaxRef>`;
    }

    if (SalesTaxCodeRef) {
        xmlQuery += `<SalesTaxCodeRef>
        ${SalesTaxCodeRef.ListID ? `<ListID>${SalesTaxCodeRef.ListID}</ListID>` : ""}
        ${SalesTaxCodeRef.FullName ? `<FullName>${SalesTaxCodeRef.FullName}</FullName>` : ""}
      </SalesTaxCodeRef>`;
    }

    if (ItemRef && Array.isArray(ItemRef)) {
        ItemRef.forEach(item => {
            xmlQuery += `<InvoiceLineMod>
            <ItemRef>
                ${item.ItemListID ? `<ListID>${item.ItemListID}</ListID>` : ""}
                ${item.ItemFullName ? `<FullName>${item.ItemFullName}</FullName>` : ""}
            </ItemRef>
            ${item.Quantity ? `<Quantity>${item.Quantity}</Quantity>` : ""}
            ${item.Rate ? `<Rate>${item.Rate}</Rate>` : ""}
            ${item.Amount ? `<Amount>${item.Amount}</Amount>` : ""}
            ${item.Description ? `<Description>${item.Description}</Description>` : ""}
            </InvoiceLineMod>`;
        });
    }

    if (AccountRef) {
        xmlQuery += `<AccountRef>
        ${AccountRef.ListID ? `<ListID>${AccountRef.ListID}</ListID>` : ""}
        ${AccountRef.FullName ? `<FullName>${AccountRef.FullName}</FullName>` : ""}
      </AccountRef>`;
    }

    if (ClassRef) {
        xmlQuery += `<ClassRef>
        ${ClassRef.ListID ? `<ListID>${ClassRef.ListID}</ListID>` : ""}
        ${ClassRef.FullName ? `<FullName>${ClassRef.FullName}</FullName>` : ""}
      </ClassRef>`;
    }

    if (Memo) xmlQuery += `<Memo>${Memo}</Memo>`;
    if (Shipping) xmlQuery += `<Shipping>${Shipping}</Shipping>`;
    if (PreferredDeliveryMethod) xmlQuery += `<PreferredDeliveryMethod>${PreferredDeliveryMethod}</PreferredDeliveryMethod>`;

    if (ExternalGUID) xmlQuery += `<ExternalGUID>${ExternalGUID}</ExternalGUID>`;
    if (CurrencyRef) {
        xmlQuery += `<CurrencyRef>
        ${CurrencyRef.ListID ? `<ListID>${CurrencyRef.ListID}</ListID>` : ""}
        ${CurrencyRef.FullName ? `<FullName>${CurrencyRef.FullName}</FullName>` : ""}
      </CurrencyRef>`;
    }

    if (PaymentMethodRef) {
        xmlQuery += `<PaymentMethodRef>
        ${PaymentMethodRef.ListID ? `<ListID>${PaymentMethodRef.ListID}</ListID>` : ""}
        ${PaymentMethodRef.FullName ? `<FullName>${PaymentMethodRef.FullName}</FullName>` : ""}
      </PaymentMethodRef>`;
    }

    if (CustomFieldList && Array.isArray(CustomFieldList)) {
        CustomFieldList.forEach(field => {
            xmlQuery += `<CustomField>
            ${field.ListID ? `<ListID>${field.ListID}</ListID>` : ""}
            ${field.Name ? `<Name>${field.Name}</Name>` : ""}
            ${field.Type ? `<Type>${field.Type}</Type>` : ""}
            ${field.Value ? `<Value>${field.Value}</Value>` : ""}
            </CustomField>`;
        });
    }

    // Close the InvoiceMod and InvoiceModRq tags
    xmlQuery += `</InvoiceMod>
  </InvoiceModRq>`;

    // Return or use the XML query
    console.log(xmlQuery);
    return xmlQuery;
}

export {
    ModInvoiceQuerryGenerator
}