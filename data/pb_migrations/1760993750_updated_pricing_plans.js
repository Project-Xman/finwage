/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4037094689")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_v25FGVVJkX` ON `Pricing_Plans` (`slug`)"
    ],
    "name": "Pricing_Plans"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4037094689")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_v25FGVVJkX` ON `pricing_plans` (`slug`)"
    ],
    "name": "pricing_plans"
  }, collection)

  return app.save(collection)
})
