/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("faq_items")

  // update collection data
  unmarshal({
    "name": "Faqs"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("faq_items")

  // update collection data
  unmarshal({
    "name": "faqs"
  }, collection)

  return app.save(collection)
})
