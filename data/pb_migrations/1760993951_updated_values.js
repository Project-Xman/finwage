/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("company_values")

  // update collection data
  unmarshal({
    "name": "Values"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("company_values")

  // update collection data
  unmarshal({
    "name": "values"
  }, collection)

  return app.save(collection)
})
