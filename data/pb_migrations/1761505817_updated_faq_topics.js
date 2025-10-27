/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId("g8bfvgmdclvklv9");

    // update collection data
    unmarshal(
      {
        listRule: "",
        viewRule: "",
      },
      collection,
    );

    return app.save(collection);
  },
  (app) => {
    const collection = app.findCollectionByNameOrId("g8bfvgmdclvklv9");

    // update collection data
    unmarshal(
      {
        listRule: null,
        viewRule: null,
      },
      collection,
    );

    return app.save(collection);
  },
);
