/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("contact_options")

  // update collection data
  unmarshal({
    "name": "Contacts"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("contact_options")

  // update collection data
  unmarshal({
    "name": "contacts"
  }, collection)

  return app.save(collection)
})
