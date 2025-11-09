/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId("pbc_23591577162");

    // update collection data
    unmarshal(
      {
        createRule: "@request.auth.id != ''",
        deleteRule: "@request.auth.id != ''",
        listRule: "published = true",
        updateRule: "@request.auth.id != ''",
        viewRule: "published = true",
      },
      collection,
    );

    return app.save(collection);
  },
  (app) => {
    const collection = app.findCollectionByNameOrId("pbc_23591577162");

    // update collection data
    unmarshal(
      {
        createRule: null,
        deleteRule: null,
        listRule: null,
        updateRule: null,
        viewRule: null,
      },
      collection,
    );

    return app.save(collection);
  },
);
