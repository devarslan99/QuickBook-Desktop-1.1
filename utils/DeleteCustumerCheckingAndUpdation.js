import  { Customer, DeletedCustomer } from "../models/custumers.model.js" // Adjust the path as necessary

const processCustomerData = async (newCustomerData) => {
try {
    
      // Check if there are any customers in the database
    //   console.log("The Custumer List is :",newCustomerData);
      const existingCustomers = await Customer.find({}).lean();
      const newCustomerIDs = newCustomerData.map(customer => customer.ListID);
    // console.log(existingCustomers);
      if (existingCustomers.length === 0) {
        // If no customers exist, call the initial data storage function
        await saveInitialData(newCustomerData);
      } else {
        // If customers exist, call the update function
        console.log('Upadting Block');
        await updateCustomerData(newCustomerData);
      }
} catch (error) {
    console.log(error);
}
};

const saveInitialData = async (customerData) => {
  for (const customer of customerData) {
    await Customer.create({
      listID: customer.ListID,
      name: customer.Name,
      // Add other fields as needed
    });
  }
};

const updateCustomerData = async (newCustomerData) => {
  const storedCustomers = await Customer.find({}).lean();
  const newCustomerIDs = newCustomerData.map(customer => customer.ListID);

  // Check for deleted customers
  const deletedCustomers = storedCustomers.filter(
    customer => !newCustomerIDs.includes(customer.listID)
  );

  if (deletedCustomers.length > 0) {
    // Log deleted customers
    console.log('Deleted Customers:', deletedCustomers);

    // Store deleted customers in a separate collection
    await DeletedCustomer.insertMany(deletedCustomers);

    // Remove deleted customers from the main collection
    await Customer.deleteMany({
      listID: { $in: deletedCustomers.map(customer => customer.listID) }
    });
  }

  // Re-insert or update existing customers
  for (const customer of newCustomerData) {
    await Customer.findOneAndUpdate(
      { listID: customer.ListID },
      { $set: { name: customer.Name } }, // Add other fields as needed
      { upsert: true }
    );
  }
};

export {
    processCustomerData
}