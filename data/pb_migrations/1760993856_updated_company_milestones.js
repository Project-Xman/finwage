/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("milestones")

  // update collection data
  unmarshal({
    "name": "Company_Milestones"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("milestones")

  // update collection data
  unmarshal({
    "name": "company_milestones"
  }, collection)

  return app.save(collection)
})
