// pb_hooks/webhook_utils.js

// --- Helper Function: Send Webhook ---
async function sendWebhook(destination, headersObject, payload) {
  // Use the headers object directly. Default to empty object if null/undefined.
  const headers = headersObject || {};
  // Ensure Content-Type is set for JSON payload
  headers["Content-Type"] = "application/json";

  console.log(`Sending webhook to: ${destination}`); // Log for debugging

  try {
    // Use PocketBase's $http.send for making HTTP requests
    const response = await $http.send({
      url: destination,
      method: "POST", // Typically POST for webhooks
      headers: headers,
      body: payload,
      timeout: 10000, // 10 second timeout
    });

    // Check the response status
    if (response.status >= 200 && response.status < 300) {
      console.log(
        `Webhook to ${destination} succeeded with status ${response.status}`,
      );
    } else {
      // Log failure with status and potentially response body
      console.error(
        `Webhook to ${destination} failed with status ${response.status}: ${response.body}`,
      );
    }
  } catch (error) {
    // Catch any network or other errors during the request
    console.error(`Error sending webhook to ${destination}:`, error.message);
  }
}

// --- Main Function: Trigger Webhooks Based on Event ---
async function triggerWebhooks(action, collectionName, record) {
  // Add logging immediately inside the function
  console.log("--- Entering triggerWebhooks function ---");
  console.log(`Action: ${action}`);
  console.log(`Collection Name (passed in): ${collectionName}`);
  console.log(`Record ID (passed in): ${record.id}`);

  // Use the collectionName passed from the hook
  const eventType = action; // The action is 'create', 'update', or 'delete'

  console.log(
    `Webhook trigger called for ${action} on collection ${collectionName}`,
  );

  try {
    console.log(
      `About to query 'webhooks' collection for ${collectionName} ${action}...`,
    );
    console.log(
      `Using filter: collection = ${collectionName} && active = true && (event_type = "${eventType}" || event_type = "" || event_type = null)`,
    );

    // Query the 'webhooks' collection for active webhooks matching the collection and event type
    let webhooks = [];
    try {
      webhooks = $app.dao().findRecordsByFilter(
        "webhooks",
        `collection = "${collectionName}" && active = true && (event_type ?~ "${eventType}" || event_type = "" || event_type = null)`,
        "-created",
        0,
        0,
      );
    } catch (dbErr) {
      // Ignore "no rows in result set" error which can happen if no records match
      // or if the collection is empty in some versions/configurations
      if (dbErr.message && dbErr.message.includes("no rows in result set")) {
        console.log("No matching webhooks found (sql: no rows in result set).");
        return;
      }
      throw dbErr;
    }

    console.log(
      `Query completed. Found ${webhooks.length} potential webhooks for ${collectionName} ${action}`,
    );

    if (webhooks.length === 0) {
      console.log("No matching webhooks found, exiting early.");
      return;
    }

    console.log("Preparing payload...");
    const payload = JSON.stringify({
      action: action,
      collection: collectionName,
      record: record,
    });

    console.log(
      `Payload prepared (${payload.length} chars). Sending webhooks...`,
    );

    for (const webhook of webhooks) {
      const destination = webhook.getString("destination");
      const headersObject = webhook.unmarshalJSONField("headers");

      console.log(
        `Processing webhook config: ${webhook.getString("name")} -> ${destination}`,
      );

      await sendWebhook(destination, headersObject, payload);
    }

    console.log("All webhooks processed for this event.");
  } catch (err) {
    console.error("Error querying or processing webhooks:", err.message);
    console.error("Error stack:", err.stack);
  }
}

// Export the function so it can be required by other files
module.exports = {
  triggerWebhooks: triggerWebhooks,
};
