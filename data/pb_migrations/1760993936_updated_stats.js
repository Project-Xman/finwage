/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("company_stats")

  // update collection data
  unmarshal({
    "name": "Stats"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("company_stats")

  // update collection data
  unmarshal({
    "name": "stats"
  }, collection)

  return app.save(collection)
})
