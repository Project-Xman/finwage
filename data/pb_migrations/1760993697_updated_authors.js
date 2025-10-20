/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_526341563")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_6POGXMkIGC` ON `Authors` (`slug`)",
      "CREATE UNIQUE INDEX `idx_lFdlSSw9tc` ON `Authors` (`email`)"
    ],
    "name": "Authors"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_526341563")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_6POGXMkIGC` ON `authors` (`slug`)",
      "CREATE UNIQUE INDEX `idx_lFdlSSw9tc` ON `authors` (`email`)"
    ],
    "name": "authors"
  }, collection)

  return app.save(collection)
})
