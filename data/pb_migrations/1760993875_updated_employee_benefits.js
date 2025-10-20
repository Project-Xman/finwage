/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("benefits")

  // update collection data
  unmarshal({
    "name": "Employee_Benefits"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("benefits")

  // update collection data
  unmarshal({
    "name": "employee_benefits"
  }, collection)

  return app.save(collection)
})
