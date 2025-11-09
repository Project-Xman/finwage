/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId("pbc_2359157716");

    // update collection data
    unmarshal(
      {
        name: "resource_downloads",
      },
      collection,
    );

    return app.save(collection);
  },
  (app) => {
    const collection = app.findCollectionByNameOrId("pbc_2359157716");

    // update collection data
    unmarshal(
      {
        name: "resource_articles",
      },
      collection,
    );

    return app.save(collection);
  },
);
