/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("job_positions")

  // update collection data
  unmarshal({
    "name": "Jobs"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("job_positions")

  // update collection data
  unmarshal({
    "name": "jobs"
  }, collection)

  return app.save(collection)
})
