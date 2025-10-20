/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("office_locations")

  // update collection data
  unmarshal({
    "name": "Locations"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("office_locations")

  // update collection data
  unmarshal({
    "name": "locations"
  }, collection)

  return app.save(collection)
})
