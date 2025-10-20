/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2946828669")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_ClMhtv8lUt` ON `Partners` (`slug`)"
    ],
    "name": "Partners"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2946828669")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_ClMhtv8lUt` ON `partners` (`slug`)"
    ],
    "name": "partners"
  }, collection)

  return app.save(collection)
})
