/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId("t9kcwli6tj7h0fk");

    // add new SEO fields
    collection.fields.addAt(
      13,
      new Field({
        autogeneratePattern: "",
        hidden: false,
        id: "seo_title",
        max: 160,
        min: 0,
        name: "seo_title",
        pattern: "",
        presentable: false,
        primaryKey: false,
        required: false,
        system: false,
        type: "text",
      }),
    );

    collection.fields.addAt(
      14,
      new Field({
        autogeneratePattern: "",
        hidden: false,
        id: "seo_description",
        max: 320,
        min: 0,
        name: "seo_description",
        pattern: "",
        presentable: false,
        primaryKey: false,
        required: false,
        system: false,
        type: "text",
      }),
    );

    collection.fields.addAt(
      15,
      new Field({
        autogeneratePattern: "",
        hidden: false,
        id: "seo_keywords",
        max: 500,
        min: 0,
        name: "seo_keywords",
        pattern: "",
        presentable: false,
        primaryKey: false,
        required: false,
        system: false,
        type: "text",
      }),
    );

    collection.fields.addAt(
      16,
      new Field({
        autogeneratePattern: "",
        hidden: false,
        id: "og_image",
        max: 0,
        min: 0,
        name: "og_image",
        pattern: "",
        presentable: false,
        primaryKey: false,
        required: false,
        system: false,
        type: "text",
      }),
    );

    collection.fields.addAt(
      17,
      new Field({
        exceptDomains: null,
        hidden: false,
        id: "canonical_url",
        name: "canonical_url",
        onlyDomains: null,
        presentable: false,
        required: false,
        system: false,
        type: "url",
      }),
    );

    return app.save(collection);
  },
  (app) => {
    const collection = app.findCollectionByNameOrId("t9kcwli6tj7h0fk");

    // remove SEO fields on rollback
    collection.fields.removeById("seo_title");
    collection.fields.removeById("seo_description");
    collection.fields.removeById("seo_keywords");
    collection.fields.removeById("og_image");
    collection.fields.removeById("canonical_url");

    return app.save(collection);
  },
);
