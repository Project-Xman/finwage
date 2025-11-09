/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const collection = new Collection({
      name: "resource_articles",
      type: "base",
      system: false,
      schema: [
        {
          name: "title",
          type: "text",
          required: true,
          presentable: false,
          unique: false,
          options: {
            min: null,
            max: null,
            pattern: "",
          },
        },
        {
          name: "slug",
          type: "text",
          required: true,
          presentable: false,
          unique: true,
          options: {
            min: null,
            max: null,
            pattern: "",
          },
        },
        {
          name: "excerpt",
          type: "text",
          required: false,
          presentable: false,
          unique: false,
          options: {
            min: null,
            max: null,
            pattern: "",
          },
        },
        {
          name: "image",
          type: "file",
          required: false,
          presentable: false,
          unique: false,
          options: {
            mimeTypes: ["image/jpeg", "image/png", "image/webp"],
            thumbs: [],
            maxSelect: 1,
            maxSize: 5242880,
            protected: false,
          },
        },
        {
          name: "category",
          type: "relation",
          required: false,
          presentable: false,
          unique: false,
          options: {
            collectionId: "resource_categories",
            cascadeDelete: false,
            minSelect: null,
            maxSelect: 1,
            displayFields: ["name"],
          },
        },
        {
          name: "published_date",
          type: "date",
          required: false,
          presentable: false,
          unique: false,
          options: {
            min: "",
            max: "",
          },
        },
        {
          name: "read_time",
          type: "text",
          required: false,
          presentable: false,
          unique: false,
          options: {
            min: null,
            max: null,
            pattern: "",
          },
        },
        {
          name: "featured",
          type: "bool",
          required: false,
          presentable: false,
          unique: false,
        },
        {
          name: "published",
          type: "bool",
          required: false,
          presentable: false,
          unique: false,
        },
        {
          name: "order",
          type: "number",
          required: false,
          presentable: false,
          unique: false,
          options: {
            min: null,
            max: null,
            noDecimal: false,
          },
        },
      ],
      indexes: ["CREATE UNIQUE INDEX `idx_slug` ON `resource_articles` (`slug`)"],
      listRule: "published = true",
      viewRule: "published = true",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
    });

    return app.save(collection);
  },
  (app) => {
    const collection = app.findCollectionByNameOrId("resource_articles");
    return app.delete(collection);
  }
);
