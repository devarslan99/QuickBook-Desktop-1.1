
const AllCustumersQuerryGenerator = ()=>{
    let xmlQuerry = `<CustomerQueryRq>
    <ActiveStatus>All</ActiveStatus>
    <IncludeRetElement>ListID</IncludeRetElement>
      <IncludeRetElement>Name</IncludeRetElement>
</CustomerQueryRq>`
return xmlQuerry
}

export {
    AllCustumersQuerryGenerator
}