// pb_hooks/webhook_handler.js

// --- Register Hooks: Listen for Record Events ---

// Hook for successful record creation
onRecordAfterCreateSuccess(async (e) => {
  // Load the webhook utilities module inside the hook
  const { triggerWebhooks } = require(`${__hooks}/webhook_utils.js`);

  console.log("--- onRecordAfterCreateSuccess hook triggered ---");
  console.log(
    "Full e object (first 300 chars):",
    JSON.stringify(e).substring(0, 300),
  );
  console.log("Record ID:", e.record?.id);

  // Use collection() method to get the collection name from the Record object
  let recordCollectionName;
  try {
    recordCollectionName = e.record?.collection()?.name;
    console.log(
      "Record Collection Name (extracted in hook):",
      recordCollectionName,
    );
  } catch (err) {
    console.error("Error extracting collection name:", err.message);
    return;
  }

  // Call the main trigger function with 'create' action and the extracted name
  console.log("About to call triggerWebhooks with:", {
    action: "create",
    collectionName: recordCollectionName,
    recordId: e.record?.id,
  });

  try {
    await triggerWebhooks("create", recordCollectionName, e.record);
  } catch (error) {
    console.error(
      "*** CRITICAL ERROR in create webhook handler:",
      error.message,
    );
    console.error("*** Stack:", error.stack);
  }
});

// Hook for successful record update
onRecordAfterUpdateSuccess(async (e) => {
  // Load the webhook utilities module inside the hook
  const { triggerWebhooks } = require(`${__hooks}/webhook_utils.js`);

  console.log("--- onRecordAfterUpdateSuccess hook triggered ---");

  let recordCollectionName;
  try {
    recordCollectionName = e.record?.collection()?.name;
    console.log("Record ID:", e.record?.id);
    console.log(
      "Record Collection Name (extracted in hook):",
      recordCollectionName,
    );
  } catch (err) {
    console.error("Error extracting collection name:", err.message);
    return;
  }

  console.log("About to call triggerWebhooks for update");

  try {
    await triggerWebhooks("update", recordCollectionName, e.record);
  } catch (error) {
    console.error(
      "*** CRITICAL ERROR in update webhook handler:",
      error.message,
    );
    console.error("*** Stack:", error.stack);
  }
});

// Hook for successful record deletion
onRecordAfterDeleteSuccess(async (e) => {
  // Load the webhook utilities module inside the hook
  const { triggerWebhooks } = require(`${__hooks}/webhook_utils.js`);

  console.log("--- onRecordAfterDeleteSuccess hook triggered ---");

  let recordCollectionName;
  try {
    recordCollectionName = e.record?.collection()?.name;
    console.log("Record ID:", e.record?.id);
    console.log(
      "Record Collection Name (extracted in hook):",
      recordCollectionName,
    );
  } catch (err) {
    console.error("Error extracting collection name:", err.message);
    return;
  }

  console.log("About to call triggerWebhooks for delete");

  try {
    await triggerWebhooks("delete", recordCollectionName, e.record);
  } catch (error) {
    console.error(
      "*** CRITICAL ERROR in delete webhook handler:",
      error.message,
    );
    console.error("*** Stack:", error.stack);
  }
});

console.log("Webhook handler script loaded.");

// Test that triggerWebhooks function is accessible
console.log("Webhook handler hooks registered successfully.");
