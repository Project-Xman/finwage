/// <reference path="../pb_data/types.d.ts" />

migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId("ff4ld3uohrf5e3t");

    if (!collection) {
      console.error("Collection not found!");
      return;
    }

    // Check if the field exists before adding it (to prevent duplicates)
    const fieldExists = collection.fields.some(f => f.id === "select2467634050");
    if (!fieldExists) {
      collection.fields.addAt(
        6,
        new Field({
          hidden: false,
          id: "select2467634050",
          maxSelect: 2,
          name: "event_type",
          presentable: false,
          required: true,
          system: false,
          type: "select",
          values: ["create", "update", "delete"],
        })
      );
    }

    return app.save(collection);
  },
  (app) => {
    const collection = app.findCollectionByNameOrId("ff4ld3uohrf5e3t");

    if (!collection) {
      console.error("Collection not found!");
      return;
    }

    // Safely remove the field if it exists
    const field = collection.fields.find(f => f.id === "select2467634050");
    if (field) {
      collection.fields.removeById("select2467634050");
      console.log("Field removed successfully.");
    } else {
      console.log("Field not found, skipping removal.");
    }

    return app.save(collection);
  }
);
