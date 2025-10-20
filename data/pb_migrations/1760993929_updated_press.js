/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("press_releases")

  // update collection data
  unmarshal({
    "name": "Press"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("press_releases")

  // update collection data
  unmarshal({
    "name": "press"
  }, collection)

  return app.save(collection)
})
