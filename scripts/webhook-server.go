package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
)

type WebhookPayload struct {
	Action     string      `json:"action"`
	Collection string      `json:"collection"`
	Record     interface{} `json:"record"`
	Auth       interface{} `json:"auth,omitempty"`
	Admin      interface{} `json:"admin,omitempty"`
}

func webhookHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read request body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	var payload WebhookPayload
	if err := json.Unmarshal(body, &payload); err != nil {
		http.Error(w, "Invalid JSON payload", http.StatusBadRequest)
		return
	}

	// Log the webhook event
	log.Printf("Webhook received: %s on %s", payload.Action, payload.Collection)

	// Handle different collections and actions
	switch payload.Collection {
	case "contacts":
		handleContactWebhook(payload)
	case "blogs":
		handleBlogWebhook(payload)
	case "testimonials":
		handleTestimonialWebhook(payload)
	default:
		log.Printf("Unhandled collection: %s", payload.Collection)
	}

	// Respond with success
	response := map[string]interface{}{
		"success":    true,
		"message":    "Webhook processed successfully",
		"action":     payload.Action,
		"collection": payload.Collection,
	}

	jsonResponse, _ := json.Marshal(response)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
}

func handleContactWebhook(payload WebhookPayload) {
	if payload.Action == "create" {
		log.Println("New contact form submission received")
		// Add your contact handling logic here
		// e.g., send notification email, add to CRM, etc.
	}
}

func handleBlogWebhook(payload WebhookPayload) {
	switch payload.Action {
	case "create":
		log.Println("New blog post created")
		// Clear cache, send notifications, etc.
	case "update":
		log.Println("Blog post updated")
		// Update cache, reindex content, etc.
	case "delete":
		log.Println("Blog post deleted")
		// Clean up related data, update sitemap, etc.
	}
}

func handleTestimonialWebhook(payload WebhookPayload) {
	if payload.Action == "create" {
		log.Println("New testimonial received")
		// Send thank you email, update homepage cache, etc.
	}
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	response := map[string]interface{}{
		"status":  "ok",
		"message": "Webhook server is running",
	}

	jsonResponse, _ := json.Marshal(response)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
}

func main() {
	http.HandleFunc("/webhook", webhookHandler)
	http.HandleFunc("/health", healthHandler)

	port := "8080"
	fmt.Printf("Webhook server starting on port %s\n", port)
	fmt.Printf("Webhook endpoint: http://localhost:%s/webhook\n", port)
	fmt.Printf("Health check: http://localhost:%s/health\n", port)

	log.Fatal(http.ListenAndServe(":"+port, nil))
}