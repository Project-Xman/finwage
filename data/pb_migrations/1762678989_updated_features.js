/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId("7mj7xmewunl692z");

    // update field
    collection.fields.addAt(
      4,
      new Field({
        autogeneratePattern: "",
        hidden: false,
        id: "kxeuzwuu",
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
    const collection = app.findCollectionByNameOrId("7mj7xmewunl692z");

    // update field
    collection.fields.addAt(
      4,
      new Field({
        autogeneratePattern: "",
        hidden: false,
        id: "kxeuzwuu",
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
