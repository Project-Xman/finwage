/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1755271091");

  // This migration is intentionally empty
  // The category_text field should be added through the PocketBase admin UI
  // or will be created automatically when records are inserted

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1755271091");

  return app.save(collection);
})
