package main

import (
	"log"

	"github.com/pocketbase/pocketbase"
)

func main() {
	app := pocketbase.New()

	// Attach webhooks plugin
	attachWebhooks(app)

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}