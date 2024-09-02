
const AddNewInventoryQuerryGenerator = ( body )=>{
    let xmlQuery = ``;
    const {
      Name,
      IsActive,
      ManufacturerPartNumber,
      PurchaseDesc,
      SalesDesc,
      SalesPrice,
      PurchaseCost,
      AssetAccountRef,
      IncomeAccountRef,
      ExpenseAccountRef,
      InventoryAccountRef,
      QuantityOnHand,
      QuantityOnOrder,
      ReorderPoint,
      PreferredVendorRef,
      BarCode,
      UnitOfMeasureSetRef,
      SalesTaxCodeRef,
      ItemSalesTaxRef,
      TaxCodeRef,
      ItemTypeRef,
      CustomFields,
      SubItemOfRef,
      ExternalGUID,
      ListID,
      FullName
    } = body;
  
    xmlQuery = `<ItemInventoryAddRq>
      <ItemInventoryAdd>`;
  
    // Add required fields
    if (!Name) {
      return { error: "Name is required" };
    }
    xmlQuery += `<Name>${Name}</Name>`;
  
    // Add optional fields dynamically
    if (IsActive !== undefined) xmlQuery += `<IsActive>${IsActive}</IsActive>`;
    if (ManufacturerPartNumber) xmlQuery += `<ManufacturerPartNumber>${ManufacturerPartNumber}</ManufacturerPartNumber>`;
    if (PurchaseDesc) xmlQuery += `<PurchaseDesc>${PurchaseDesc}</PurchaseDesc>`;
    if (SalesDesc) xmlQuery += `<SalesDesc>${SalesDesc}</SalesDesc>`;
    if (SalesPrice) xmlQuery += `<SalesPrice>${SalesPrice}</SalesPrice>`;
    if (PurchaseCost) xmlQuery += `<PurchaseCost>${PurchaseCost}</PurchaseCost>`;
    
    if (AssetAccountRef) {
      xmlQuery += `<AssetAccountRef>
        ${AssetAccountRef.ListID ? `<ListID>${AssetAccountRef.ListID}</ListID>` : ""}
        ${AssetAccountRef.FullName ? `<FullName>${AssetAccountRef.FullName}</FullName>` : ""}
      </AssetAccountRef>`;
    }
  
    if (IncomeAccountRef) {
      xmlQuery += `<IncomeAccountRef>
        ${IncomeAccountRef.ListID ? `<ListID>${IncomeAccountRef.ListID}</ListID>` : ""}
        ${IncomeAccountRef.FullName ? `<FullName>${IncomeAccountRef.FullName}</FullName>` : ""}
      </IncomeAccountRef>`;
    }
  
    if (ExpenseAccountRef) {
      xmlQuery += `<ExpenseAccountRef>
        ${ExpenseAccountRef.ListID ? `<ListID>${ExpenseAccountRef.ListID}</ListID>` : ""}
        ${ExpenseAccountRef.FullName ? `<FullName>${ExpenseAccountRef.FullName}</FullName>` : ""}
      </ExpenseAccountRef>`;
    }
  
    if (InventoryAccountRef) {
      xmlQuery += `<InventoryAccountRef>
        ${InventoryAccountRef.ListID ? `<ListID>${InventoryAccountRef.ListID}</ListID>` : ""}
        ${InventoryAccountRef.FullName ? `<FullName>${InventoryAccountRef.FullName}</FullName>` : ""}
      </InventoryAccountRef>`;
    }
  
    if (QuantityOnHand) xmlQuery += `<QuantityOnHand>${QuantityOnHand}</QuantityOnHand>`;
    if (QuantityOnOrder) xmlQuery += `<QuantityOnOrder>${QuantityOnOrder}</QuantityOnOrder>`;
    if (ReorderPoint) xmlQuery += `<ReorderPoint>${ReorderPoint}</ReorderPoint>`;
    
    if (PreferredVendorRef) {
      xmlQuery += `<PreferredVendorRef>
        ${PreferredVendorRef.ListID ? `<ListID>${PreferredVendorRef.ListID}</ListID>` : ""}
        ${PreferredVendorRef.FullName ? `<FullName>${PreferredVendorRef.FullName}</FullName>` : ""}
      </PreferredVendorRef>`;
    }
  
    if (BarCode) xmlQuery += `<BarCode>${BarCode}</BarCode>`;
    if (UnitOfMeasureSetRef) {
      xmlQuery += `<UnitOfMeasureSetRef>
        ${UnitOfMeasureSetRef.ListID ? `<ListID>${UnitOfMeasureSetRef.ListID}</ListID>` : ""}
        ${UnitOfMeasureSetRef.FullName ? `<FullName>${UnitOfMeasureSetRef.FullName}</FullName>` : ""}
      </UnitOfMeasureSetRef>`;
    }
  
    if (SalesTaxCodeRef) {
      xmlQuery += `<SalesTaxCodeRef>
        ${SalesTaxCodeRef.ListID ? `<ListID>${SalesTaxCodeRef.ListID}</ListID>` : ""}
        ${SalesTaxCodeRef.FullName ? `<FullName>${SalesTaxCodeRef.FullName}</FullName>` : ""}
      </SalesTaxCodeRef>`;
    }
  
    if (ItemSalesTaxRef) {
      xmlQuery += `<ItemSalesTaxRef>
        ${ItemSalesTaxRef.ListID ? `<ListID>${ItemSalesTaxRef.ListID}</ListID>` : ""}
        ${ItemSalesTaxRef.FullName ? `<FullName>${ItemSalesTaxRef.FullName}</FullName>` : ""}
      </ItemSalesTaxRef>`;
    }
  
    if (TaxCodeRef) {
      xmlQuery += `<TaxCodeRef>
        ${TaxCodeRef.ListID ? `<ListID>${TaxCodeRef.ListID}</ListID>` : ""}
        ${TaxCodeRef.FullName ? `<FullName>${TaxCodeRef.FullName}</FullName>` : ""}
      </TaxCodeRef>`;
    }
  
    if (ItemTypeRef) {
      xmlQuery += `<ItemTypeRef>
        ${ItemTypeRef.ListID ? `<ListID>${ItemTypeRef.ListID}</ListID>` : ""}
        ${ItemTypeRef.FullName ? `<FullName>${ItemTypeRef.FullName}</FullName>` : ""}
      </ItemTypeRef>`;
    }
  
    if (CustomFields && Array.isArray(CustomFields)) {
      CustomFields.forEach((field) => {
        xmlQuery += `<CustomFields>
          <CustomField>
            <Name>${field.Name}</Name>
            <Value>${field.Value}</Value>
          </CustomField>
        </CustomFields>`;
      });
    }
  
    if (SubItemOfRef) {
      xmlQuery += `<SubItemOfRef>
        ${SubItemOfRef.ListID ? `<ListID>${SubItemOfRef.ListID}</ListID>` : ""}
        ${SubItemOfRef.FullName ? `<FullName>${SubItemOfRef.FullName}</FullName>` : ""}
      </SubItemOfRef>`;
    }
  
    if (ExternalGUID) xmlQuery += `<ExternalGUID>${ExternalGUID}</ExternalGUID>`;
  
    // Closing the ItemInventoryAdd and ItemInventoryAddRq tags
    xmlQuery += `</ItemInventoryAdd>
    </ItemInventoryAddRq>`;
  
    // Responding with the constructed XML for debugging or further processing
    console.log(xmlQuery);
  
    return xmlQuery;
      
}

export {
    AddNewInventoryQuerryGenerator
}