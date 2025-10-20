/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1873367423")

  // update collection data
  unmarshal({
    "name": "Testimonials"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1873367423")

  // update collection data
  unmarshal({
    "name": "testimonials"
  }, collection)

  return app.save(collection)
})
