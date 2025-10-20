/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_733358252")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_wjgB3Oq6Aq` ON `Integrations` (`slug`)"
    ],
    "name": "Integrations"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_733358252")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_wjgB3Oq6Aq` ON `integrations` (`slug`)"
    ],
    "name": "integrations"
  }, collection)

  return app.save(collection)
})
