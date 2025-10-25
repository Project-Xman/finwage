/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("contact_options")

  // update field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "cont_featured",
    "name": "is_featured",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("contact_options")

  // update field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "cont_featured",
    "name": "addressed",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
})
