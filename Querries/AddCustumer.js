const AddCustumerQuerryGenerator = (body) => {
  let xmlQuery = ``;
  const {
    Name,
    IsActive,
    ClassRef,
    ParentRef,
    CompanyName,
    Salutation,
    FirstName,
    MiddleName,
    LastName,
    JobTitle,
    BillAddress,
    ShipAddress,
    ShipToAddress,
    Phone,
    AltPhone,
    Fax,
    Email,
    Cc,
    Contact,
    AltContact,
    AdditionalContactRef,
    Contacts,
    CustomerTypeRef,
    TermsRef,
    SalesRepRef,
    OpenBalance,
    OpenBalanceDate,
    SalesTaxCodeRef,
    ItemSalesTaxRef,
    SalesTaxCountry,
    ResaleNumber,
    AccountNumber,
    CreditLimit,
    PreferredPaymentMethodRef,
    CreditCardInfo,
    JobStatus,
    JobStartDate,
    JobProjectedEndDate,
    JobEndDate,
    JobDesc,
    JobTypeRef,
    Notes,
    AdditionalNotes,
    PreferredDeliveryMethod,
    PriceLevelRef,
    ExternalGUID,
    TaxRegistrationNumber,
    CurrencyRef,
  } = body;
  xmlQuery = `<CustomerAddRq>
      <CustomerAdd>`;

  // Add required fields
  if (!Name) {
    return res.status(400).json({ error: "Name is required" });
  }
  xmlQuery += `<Name>${Name}</Name>`;

  // Add optional fields dynamically
  if (IsActive !== undefined) xmlQuery += `<IsActive>${IsActive}</IsActive>`;

  if (ClassRef) {
    xmlQuery += `<ClassRef>
    ${ClassRef.ListID ? `<ListID>${ClassRef.ListID}</ListID>` : ""}
    ${ClassRef.FullName ? `<FullName>${ClassRef.FullName}</FullName>` : ""}
  </ClassRef>`;
  }

  if (ParentRef) {
    xmlQuery += `<ParentRef>
    ${ParentRef.ListID ? `<ListID>${ParentRef.ListID}</ListID>` : ""}
    ${ParentRef.FullName ? `<FullName>${ParentRef.FullName}</FullName>` : ""}
  </ParentRef>`;
  }

  if (CompanyName) xmlQuery += `<CompanyName>${CompanyName}</CompanyName>`;
  if (Salutation) xmlQuery += `<Salutation>${Salutation}</Salutation>`;
  if (FirstName) xmlQuery += `<FirstName>${FirstName}</FirstName>`;
  if (MiddleName) xmlQuery += `<MiddleName>${MiddleName}</MiddleName>`;
  if (LastName) xmlQuery += `<LastName>${LastName}</LastName>`;
  if (JobTitle) xmlQuery += `<JobTitle>${JobTitle}</JobTitle>`;

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

  if (ShipToAddress && Array.isArray(ShipToAddress)) {
    ShipToAddress.forEach((shipTo) => {
      xmlQuery += `<ShipToAddress>
      <Name>${shipTo.Name}</Name>
      ${shipTo.Addr1 ? `<Addr1>${shipTo.Addr1}</Addr1>` : ""}
      ${shipTo.Addr2 ? `<Addr2>${shipTo.Addr2}</Addr2>` : ""}
      ${shipTo.Addr3 ? `<Addr3>${shipTo.Addr3}</Addr3>` : ""}
      ${shipTo.Addr4 ? `<Addr4>${shipTo.Addr4}</Addr4>` : ""}
      ${shipTo.Addr5 ? `<Addr5>${shipTo.Addr5}</Addr5>` : ""}
      ${shipTo.City ? `<City>${shipTo.City}</City>` : ""}
      ${shipTo.State ? `<State>${shipTo.State}</State>` : ""}
      ${
        shipTo.PostalCode ? `<PostalCode>${shipTo.PostalCode}</PostalCode>` : ""
      }
      ${shipTo.Country ? `<Country>${shipTo.Country}</Country>` : ""}
      ${shipTo.Note ? `<Note>${shipTo.Note}</Note>` : ""}
      ${
        shipTo.DefaultShipTo
          ? `<DefaultShipTo>${shipTo.DefaultShipTo}</DefaultShipTo>`
          : ""
      }
    </ShipToAddress>`;
    });
  }

  if (Phone) xmlQuery += `<Phone>${Phone}</Phone>`;
  if (AltPhone) xmlQuery += `<AltPhone>${AltPhone}</AltPhone>`;
  if (Fax) xmlQuery += `<Fax>${Fax}</Fax>`;
  if (Email) xmlQuery += `<Email>${Email}</Email>`;
  if (Cc) xmlQuery += `<Cc>${Cc}</Cc>`;
  if (Contact) xmlQuery += `<Contact>${Contact}</Contact>`;
  if (AltContact) xmlQuery += `<AltContact>${AltContact}</AltContact>`;

  if (AdditionalContactRef && Array.isArray(AdditionalContactRef)) {
    AdditionalContactRef.forEach((contact) => {
      xmlQuery += `<AdditionalContactRef>
      <ContactName>${contact.ContactName}</ContactName>
      <ContactValue>${contact.ContactValue}</ContactValue>
    </AdditionalContactRef>`;
    });
  }

  if (Contacts && Array.isArray(Contacts)) {
    Contacts.forEach((contact) => {
      xmlQuery += `<Contacts>
      ${
        contact.Salutation
          ? `<Salutation>${contact.Salutation}</Salutation>`
          : ""
      }
      <FirstName>${contact.FirstName}</FirstName>
      ${
        contact.MiddleName
          ? `<MiddleName>${contact.MiddleName}</MiddleName>`
          : ""
      }
      ${contact.LastName ? `<LastName>${contact.LastName}</LastName>` : ""}
      ${contact.JobTitle ? `<JobTitle>${contact.JobTitle}</JobTitle>` : ""}`;

      if (
        contact.AdditionalContactRef &&
        Array.isArray(contact.AdditionalContactRef)
      ) {
        contact.AdditionalContactRef.forEach((ref) => {
          xmlQuery += `<AdditionalContactRef>
          <ContactName>${ref.ContactName}</ContactName>
          <ContactValue>${ref.ContactValue}</ContactValue>
        </AdditionalContactRef>`;
        });
      }

      xmlQuery += `</Contacts>`;
    });
  }

  if (CustomerTypeRef) {
    xmlQuery += `<CustomerTypeRef>
    ${
      CustomerTypeRef.ListID ? `<ListID>${CustomerTypeRef.ListID}</ListID>` : ""
    }
    ${
      CustomerTypeRef.FullName
        ? `<FullName>${CustomerTypeRef.FullName}</FullName>`
        : ""
    }
  </CustomerTypeRef>`;
  }

  if (TermsRef) {
    xmlQuery += `<TermsRef>
    ${TermsRef.ListID ? `<ListID>${TermsRef.ListID}</ListID>` : ""}
    ${TermsRef.FullName ? `<FullName>${TermsRef.FullName}</FullName>` : ""}
  </TermsRef>`;
  }

  if (SalesRepRef) {
    xmlQuery += `<SalesRepRef>
    ${SalesRepRef.ListID ? `<ListID>${SalesRepRef.ListID}</ListID>` : ""}
    ${
      SalesRepRef.FullName ? `<FullName>${SalesRepRef.FullName}</FullName>` : ""
    }
  </SalesRepRef>`;
  }

  if (OpenBalance) xmlQuery += `<OpenBalance>${OpenBalance}</OpenBalance>`;
  if (OpenBalanceDate)
    xmlQuery += `<OpenBalanceDate>${OpenBalanceDate}</OpenBalanceDate>`;

  if (SalesTaxCodeRef) {
    xmlQuery += `<SalesTaxCodeRef>
    ${
      SalesTaxCodeRef.ListID ? `<ListID>${SalesTaxCodeRef.ListID}</ListID>` : ""
    }
    ${
      SalesTaxCodeRef.FullName
        ? `<FullName>${SalesTaxCodeRef.FullName}</FullName>`
        : ""
    }
  </SalesTaxCodeRef>`;
  }

  if (ItemSalesTaxRef) {
    xmlQuery += `<ItemSalesTaxRef>
    ${
      ItemSalesTaxRef.ListID ? `<ListID>${ItemSalesTaxRef.ListID}</ListID>` : ""
    }
    ${
      ItemSalesTaxRef.FullName
        ? `<FullName>${ItemSalesTaxRef.FullName}</FullName>`
        : ""
    }
  </ItemSalesTaxRef>`;
  }

  if (SalesTaxCountry)
    xmlQuery += `<SalesTaxCountry>${SalesTaxCountry}</SalesTaxCountry>`;
  if (ResaleNumber) xmlQuery += `<ResaleNumber>${ResaleNumber}</ResaleNumber>`;
  if (AccountNumber)
    xmlQuery += `<AccountNumber>${AccountNumber}</AccountNumber>`;
  if (CreditLimit) xmlQuery += `<CreditLimit>${CreditLimit}</CreditLimit>`;

  if (PreferredPaymentMethodRef) {
    xmlQuery += `<PreferredPaymentMethodRef>
    ${
      PreferredPaymentMethodRef.ListID
        ? `<ListID>${PreferredPaymentMethodRef.ListID}</ListID>`
        : ""
    }
    ${
      PreferredPaymentMethodRef.FullName
        ? `<FullName>${PreferredPaymentMethodRef.FullName}</FullName>`
        : ""
    }
  </PreferredPaymentMethodRef>`;
  }

  if (CreditCardInfo) {
    xmlQuery += `<CreditCardInfo>
    <CreditCardNumber>${CreditCardInfo.CreditCardNumber}</CreditCardNumber>
    <ExpirationMonth>${CreditCardInfo.ExpirationMonth}</ExpirationMonth>
    <ExpirationYear>${CreditCardInfo.ExpirationYear}</ExpirationYear>
    <NameOnCard>${CreditCardInfo.NameOnCard}</NameOnCard>
    <CreditCardAddress>${CreditCardInfo.CreditCardAddress}</CreditCardAddress>
    <CreditCardPostalCode>${CreditCardInfo.CreditCardPostalCode}</CreditCardPostalCode>
  </CreditCardInfo>`;
  }

  if (JobStatus) xmlQuery += `<JobStatus>${JobStatus}</JobStatus>`;
  if (JobStartDate) xmlQuery += `<JobStartDate>${JobStartDate}</JobStartDate>`;
  if (JobProjectedEndDate)
    xmlQuery += `<JobProjectedEndDate>${JobProjectedEndDate}</JobProjectedEndDate>`;
  if (JobEndDate) xmlQuery += `<JobEndDate>${JobEndDate}</JobEndDate>`;
  if (JobDesc) xmlQuery += `<JobDesc>${JobDesc}</JobDesc>`;

  if (JobTypeRef) {
    xmlQuery += `<JobTypeRef>
    ${JobTypeRef.ListID ? `<ListID>${JobTypeRef.ListID}</ListID>` : ""}
    ${JobTypeRef.FullName ? `<FullName>${JobTypeRef.FullName}</FullName>` : ""}
  </JobTypeRef>`;
  }

  if (Notes) xmlQuery += `<Notes>${Notes}</Notes>`;

  if (AdditionalNotes && Array.isArray(AdditionalNotes)) {
    AdditionalNotes.forEach((note) => {
      xmlQuery += `<AdditionalNotes>
      <Note>${note.Note}</Note>
    </AdditionalNotes>`;
    });
  }

  if (PreferredDeliveryMethod)
    xmlQuery += `<PreferredDeliveryMethod>${PreferredDeliveryMethod}</PreferredDeliveryMethod>`;

  if (PriceLevelRef) {
    xmlQuery += `<PriceLevelRef>
    ${PriceLevelRef.ListID ? `<ListID>${PriceLevelRef.ListID}</ListID>` : ""}
    ${
      PriceLevelRef.FullName
        ? `<FullName>${PriceLevelRef.FullName}</FullName>`
        : ""
    }
  </PriceLevelRef>`;
  }

  if (ExternalGUID) xmlQuery += `<ExternalGUID>${ExternalGUID}</ExternalGUID>`;
  if (TaxRegistrationNumber)
    xmlQuery += `<TaxRegistrationNumber>${TaxRegistrationNumber}</TaxRegistrationNumber>`;

  if (CurrencyRef) {
    xmlQuery += `<CurrencyRef>
    ${CurrencyRef.ListID ? `<ListID>${CurrencyRef.ListID}</ListID>` : ""}
    ${
      CurrencyRef.FullName ? `<FullName>${CurrencyRef.FullName}</FullName>` : ""
    }
  </CurrencyRef>`;
  }

  // Closing the CustomerAdd and CustomerAddRq tags
  xmlQuery += `</CustomerAdd>
</CustomerAddRq>`;

  // Responding with the constructed XML for debugging or further processing
  console.log(xmlQuery);

  return xmlQuery
};

export { AddCustumerQuerryGenerator };
