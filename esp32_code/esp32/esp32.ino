#include <WiFi.h> // ESP32 Wi-Fi library

// Wi-Fi credentials
const char* ssid = "Android123";       // Replace with your Wi-Fi SSID
const char* password = "Android123"; // Replace with your Wi-Fi password

WiFiServer server(80); // HTTP server on port 80

void setup() {
    Serial.begin(9600); // Communication with Arduino
    Serial.println("ESP32 is starting...");

    // Connect to Wi-Fi
    WiFi.begin(ssid, password);
    Serial.print("Connecting to Wi-Fi");
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("\nWi-Fi connected");
    Serial.println("IP Address: ");
    Serial.println(WiFi.localIP());

    // Start HTTP server
    server.begin();
    Serial.println("HTTP server started");
}

void loop() {
    WiFiClient client = server.available(); // Listen for incoming clients
    if (client) {
        Serial.println("New client connected");
        String request = client.readStringUntil('\r');
        Serial.println("Request: " + request);
        client.flush();

        // Parse the request and send commands to Arduino
        if (request.indexOf("/LED_ON") != -1) {
            Serial.println("Sending command: LED_ON");
            Serial.println("LED_ON"); // Send command to Arduino
        } else if (request.indexOf("/LED_OFF") != -1) {
            Serial.println("Sending command: LED_OFF");
            Serial.println("LED_OFF"); // Send command to Arduino
        }

        // Send HTTP response
        client.println("HTTP/1.1 200 OK");
        client.println("Content-Type: text/html");
        client.println("Connection: close");
        client.println();
        client.println("<!DOCTYPE HTML>");
        client.println("<html>");
        client.println("<h1>ESP32 LED Control</h1>");
        client.println("<p><a href=\"/LED_ON\">Turn LED ON</a></p>");
        client.println("<p><a href=\"/LED_OFF\">Turn LED OFF</a></p>");
        client.println("</html>");
        client.stop();
        Serial.println("Client disconnected");
    }
}