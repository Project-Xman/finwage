/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("faq_categories")

  // update collection data
  unmarshal({
    "name": "Faq_Topics"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("faq_categories")

  // update collection data
  unmarshal({
    "name": "faq_topics"
  }, collection)

  return app.save(collection)
})
