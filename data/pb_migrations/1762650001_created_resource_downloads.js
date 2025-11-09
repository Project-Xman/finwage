/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const collection = new Collection({
      name: "resource_downloads",
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
          name: "file_url",
          type: "url",
          required: false,
          presentable: false,
          unique: false,
          options: {
            exceptDomains: null,
            onlyDomains: null,
          },
        },
        {
          name: "file",
          type: "file",
          required: false,
          presentable: false,
          unique: false,
          options: {
            mimeTypes: ["application/pdf", "application/zip"],
            thumbs: [],
            maxSelect: 1,
            maxSize: 52428800,
            protected: false,
          },
        },
        {
          name: "type",
          type: "select",
          required: false,
          presentable: false,
          unique: false,
          options: {
            maxSelect: 1,
            values: ["guide", "whitepaper", "ebook", "report", "template"],
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
          name: "active",
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
      indexes: [],
      listRule: "active = true",
      viewRule: "active = true",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
    });

    return app.save(collection);
  },
  (app) => {
    const collection = app.findCollectionByNameOrId("resource_downloads");
    return app.delete(collection);
  }
);
