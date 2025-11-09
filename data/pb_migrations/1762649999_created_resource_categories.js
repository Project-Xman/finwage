/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const collection = new Collection({
      name: "resource_categories",
      type: "base",
      system: false,
      schema: [
        {
          name: "name",
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
          name: "icon",
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
          name: "article_count",
          type: "number",
          required: false,
          presentable: false,
          unique: false,
          options: {
            min: 0,
            max: null,
            noDecimal: true,
          },
        },
        {
          name: "description",
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
        {
          name: "active",
          type: "bool",
          required: false,
          presentable: false,
          unique: false,
        },
      ],
      indexes: ["CREATE UNIQUE INDEX `idx_slug` ON `resource_categories` (`slug`)"],
      listRule: "active = true",
      viewRule: "active = true",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
    });

    return app.save(collection);
  },
  (app) => {
    const collection = app.findCollectionByNameOrId("resource_categories");
    return app.delete(collection);
  }
);
