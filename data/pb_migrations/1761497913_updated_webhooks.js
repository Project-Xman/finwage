/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId("ff4ld3uohrf5e3t");

    // add field
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

    return app.save(collection);
  },
  (app) => {
    const collection = app.findCollectionByNameOrId("ff4ld3uohrf5e3t");

    // remove field
    collection.fields.removeById("select2467634050");

    return app.save(collection);
  }
);
