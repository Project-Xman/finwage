/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("support_resources")

  // update collection data
  unmarshal({
    "name": "Support"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("support_resources")

  // update collection data
  unmarshal({
    "name": "support"
  }, collection)

  return app.save(collection)
})
