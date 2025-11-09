/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId("pexw7ocvmo3ohmj");

    // update field
    collection.fields.addAt(
      1,
      new Field({
        autogeneratePattern: "",
        hidden: false,
        id: "dlnxelkn",
        max: 0,
        min: 0,
        name: "icon_svg",
        pattern: "",
        presentable: false,
        primaryKey: false,
        required: true,
        system: false,
        type: "text",
      }),
    );

    return app.save(collection);
  },
  (app) => {
    const collection = app.findCollectionByNameOrId("pexw7ocvmo3ohmj");

    // update field
    collection.fields.addAt(
      1,
      new Field({
        autogeneratePattern: "",
        hidden: false,
        id: "dlnxelkn",
        max: 0,
        min: 0,
        name: "icon",
        pattern: "",
        presentable: false,
        primaryKey: false,
        required: true,
        system: false,
        type: "text",
      }),
    );

    return app.save(collection);
  },
);
