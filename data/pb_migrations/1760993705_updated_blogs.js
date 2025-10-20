/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1755271091")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_1kbUPNdFzm` ON `Blogs` (`slug`)"
    ],
    "name": "Blogs"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1755271091")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_1kbUPNdFzm` ON `blogs` (`slug`)"
    ],
    "name": "blogs"
  }, collection)

  return app.save(collection)
})
