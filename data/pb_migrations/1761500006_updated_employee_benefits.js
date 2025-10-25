/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("benefits");

  // Update the collection name to match our naming convention
  collection.name = "Employee_Benefits";
  
  // Ensure all required fields exist
  // The collection already has: id, title, description, icon, category, order, created, updated
  // No changes needed to field structure

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("benefits");

  collection.name = "Employee_Benefits";

  return app.save(collection);
})
