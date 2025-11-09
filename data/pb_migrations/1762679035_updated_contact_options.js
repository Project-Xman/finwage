/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId("84jmpelk1jgxyeo");

    // update field
    collection.fields.addAt(
      3,
      new Field({
        autogeneratePattern: "",
        hidden: false,
        id: "lx4no5ua",
        max: 0,
        min: 0,
        name: "icon_svg",
        pattern: "",
        presentable: false,
        primaryKey: false,
        required: false,
        system: false,
        type: "text",
      }),
    );

    return app.save(collection);
  },
  (app) => {
    const collection = app.findCollectionByNameOrId("84jmpelk1jgxyeo");

    // update field
    collection.fields.addAt(
      3,
      new Field({
        autogeneratePattern: "",
        hidden: false,
        id: "lx4no5ua",
        max: 0,
        min: 0,
        name: "icon",
        pattern: "",
        presentable: false,
        primaryKey: false,
        required: false,
        system: false,
        type: "text",
      }),
    );

    return app.save(collection);
  },
);
