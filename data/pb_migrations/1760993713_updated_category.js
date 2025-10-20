/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1174553048")

  // update collection data
  unmarshal({
    "name": "Category"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1174553048")

  // update collection data
  unmarshal({
    "name": "category"
  }, collection)

  return app.save(collection)
})
