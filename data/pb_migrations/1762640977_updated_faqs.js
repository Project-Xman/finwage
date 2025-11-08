/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("ajgjsbzl5fjq921")

  // remove field
  collection.fields.removeById("cgmtnwhi")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("ajgjsbzl5fjq921")

  // add field
  collection.fields.addAt(6, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "cgmtnwhi",
    "max": 0,
    "min": 0,
    "name": "category_text",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
