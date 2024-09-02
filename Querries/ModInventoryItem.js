
const ModInventoryItemsQuerryGenerator = ( body )=>{
        let xmlQuery = ``;
        const {
            ListID,
            EditSequence,
            Name,
            IsActive,
            ParentRef,
            SalesTaxCodeRef,
            PurchaseTaxCodeRef,
            ItemDesc,
            SalesPrice,
            Cost,
            IncomeAccountRef,
            ExpenseAccountRef,
            AssetAccountRef,
            ManufacturerPartNumber,
            PurchaseDesc,
            PurchaseCost,
            PrefVendorRef,
            QuantityOnHand,
            ReorderPoint,
            MinStockLevel,
            MaxStockLevel,
            QuantityOnOrder,
            QuantityOnBackOrder,
            InventoryAssetAccountRef,
            COGSAccountRef,
            AssetAccount,
            COGSAccount,
            AdditionalNotes,
            ExternalGUID,
        } = body;
    
        // Add required fields for modification
        if (!ListID || !EditSequence) {
            return { error: "ListID and EditSequence are required" };
        }
    
        xmlQuery = `<ItemInventoryModRq>
            <ItemInventoryMod>
              <ListID>${ListID}</ListID>
              <EditSequence>${EditSequence}</EditSequence>`;
    
        // Add optional fields dynamically
        if (Name) xmlQuery += `<Name>${Name}</Name>`;
        if (IsActive !== undefined) xmlQuery += `<IsActive>${IsActive}</IsActive>`;
    
        if (ParentRef) {
            xmlQuery += `<ParentRef>
                ${ParentRef.ListID ? `<ListID>${ParentRef.ListID}</ListID>` : ""}
                ${ParentRef.FullName ? `<FullName>${ParentRef.FullName}</FullName>` : ""}
            </ParentRef>`;
        }
    
        if (SalesTaxCodeRef) {
            xmlQuery += `<SalesTaxCodeRef>
                ${SalesTaxCodeRef.ListID ? `<ListID>${SalesTaxCodeRef.ListID}</ListID>` : ""}
                ${SalesTaxCodeRef.FullName ? `<FullName>${SalesTaxCodeRef.FullName}</FullName>` : ""}
            </SalesTaxCodeRef>`;
        }
    
        if (PurchaseTaxCodeRef) {
            xmlQuery += `<PurchaseTaxCodeRef>
                ${PurchaseTaxCodeRef.ListID ? `<ListID>${PurchaseTaxCodeRef.ListID}</ListID>` : ""}
                ${PurchaseTaxCodeRef.FullName ? `<FullName>${PurchaseTaxCodeRef.FullName}</FullName>` : ""}
            </PurchaseTaxCodeRef>`;
        }
    
        if (ItemDesc) xmlQuery += `<ItemDesc>${ItemDesc}</ItemDesc>`;
        if (SalesPrice) xmlQuery += `<SalesPrice>${SalesPrice}</SalesPrice>`;
        if (Cost) xmlQuery += `<Cost>${Cost}</Cost>`;
    
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
    
        if (AssetAccountRef) {
            xmlQuery += `<AssetAccountRef>
                ${AssetAccountRef.ListID ? `<ListID>${AssetAccountRef.ListID}</ListID>` : ""}
                ${AssetAccountRef.FullName ? `<FullName>${AssetAccountRef.FullName}</FullName>` : ""}
            </AssetAccountRef>`;
        }
    
        if (ManufacturerPartNumber) xmlQuery += `<ManufacturerPartNumber>${ManufacturerPartNumber}</ManufacturerPartNumber>`;
        if (PurchaseDesc) xmlQuery += `<PurchaseDesc>${PurchaseDesc}</PurchaseDesc>`;
        if (PurchaseCost) xmlQuery += `<PurchaseCost>${PurchaseCost}</PurchaseCost>`;
    
        if (PrefVendorRef) {
            xmlQuery += `<PrefVendorRef>
                ${PrefVendorRef.ListID ? `<ListID>${PrefVendorRef.ListID}</ListID>` : ""}
                ${PrefVendorRef.FullName ? `<FullName>${PrefVendorRef.FullName}</FullName>` : ""}
            </PrefVendorRef>`;
        }
    
        if (QuantityOnHand) xmlQuery += `<QuantityOnHand>${QuantityOnHand}</QuantityOnHand>`;
        if (ReorderPoint) xmlQuery += `<ReorderPoint>${ReorderPoint}</ReorderPoint>`;
        if (MinStockLevel) xmlQuery += `<MinStockLevel>${MinStockLevel}</MinStockLevel>`;
        if (MaxStockLevel) xmlQuery += `<MaxStockLevel>${MaxStockLevel}</MaxStockLevel>`;
        if (QuantityOnOrder) xmlQuery += `<QuantityOnOrder>${QuantityOnOrder}</QuantityOnOrder>`;
        if (QuantityOnBackOrder) xmlQuery += `<QuantityOnBackOrder>${QuantityOnBackOrder}</QuantityOnBackOrder>`;
    
        if (InventoryAssetAccountRef) {
            xmlQuery += `<InventoryAssetAccountRef>
                ${InventoryAssetAccountRef.ListID ? `<ListID>${InventoryAssetAccountRef.ListID}</ListID>` : ""}
                ${InventoryAssetAccountRef.FullName ? `<FullName>${InventoryAssetAccountRef.FullName}</FullName>` : ""}
            </InventoryAssetAccountRef>`;
        }
    
        if (COGSAccountRef) {
            xmlQuery += `<COGSAccountRef>
                ${COGSAccountRef.ListID ? `<ListID>${COGSAccountRef.ListID}</ListID>` : ""}
                ${COGSAccountRef.FullName ? `<FullName>${COGSAccountRef.FullName}</FullName>` : ""}
            </COGSAccountRef>`;
        }
    
        if (AssetAccount) xmlQuery += `<AssetAccount>${AssetAccount}</AssetAccount>`;
        if (COGSAccount) xmlQuery += `<COGSAccount>${COGSAccount}</COGSAccount>`;
        if (AdditionalNotes) xmlQuery += `<AdditionalNotes>${AdditionalNotes}</AdditionalNotes>`;
        if (ExternalGUID) xmlQuery += `<ExternalGUID>${ExternalGUID}</ExternalGUID>`;
    
        // Close the ItemInventoryMod and ItemInventoryModRq tags
        xmlQuery += `</ItemInventoryMod>
        </ItemInventoryModRq>`;
    
        // Return or use the XML query
        console.log(xmlQuery);
        return xmlQuery;
}

export {
    ModInventoryItemsQuerryGenerator
}