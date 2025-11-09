/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId("ke3h2ioma82kf12");

    // update field
    collection.fields.addAt(
      3,
      new Field({
        autogeneratePattern: "",
        hidden: false,
        id: "xxibvjbb",
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
    const collection = app.findCollectionByNameOrId("ke3h2ioma82kf12");

    // update field
    collection.fields.addAt(
      3,
      new Field({
        autogeneratePattern: "",
        hidden: false,
        id: "xxibvjbb",
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
