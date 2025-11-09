/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId("4yynrrycy21emob");

    // update field
    collection.fields.addAt(
      5,
      new Field({
        autogeneratePattern: "",
        hidden: false,
        id: "pytzai91",
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
    const collection = app.findCollectionByNameOrId("4yynrrycy21emob");

    // update field
    collection.fields.addAt(
      5,
      new Field({
        autogeneratePattern: "",
        hidden: false,
        id: "pytzai91",
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
