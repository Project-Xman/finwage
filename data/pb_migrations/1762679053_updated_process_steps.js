/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId("1orzmnhcxugwtya");

    // update field
    collection.fields.addAt(
      4,
      new Field({
        autogeneratePattern: "",
        hidden: false,
        id: "n2vnppib",
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
    const collection = app.findCollectionByNameOrId("1orzmnhcxugwtya");

    // update field
    collection.fields.addAt(
      4,
      new Field({
        autogeneratePattern: "",
        hidden: false,
        id: "n2vnppib",
        max: 0,
        min: 0,
        name: "icon_from_font_awesome",
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
