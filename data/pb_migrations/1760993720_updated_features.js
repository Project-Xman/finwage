/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4287529994")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_g4QdPEuP1f` ON `Features` (`slug`)"
    ],
    "name": "Features"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4287529994")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_g4QdPEuP1f` ON `features` (`slug`)"
    ],
    "name": "features"
  }, collection)

  return app.save(collection)
})
