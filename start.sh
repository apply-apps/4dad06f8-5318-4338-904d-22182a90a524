#!/bin/sh

# Use the EXPO_PORT environment variable if set, otherwise die
if [ -z "$EXPO_PORT" ]; then
  echo "Please set the PORT environment variable"
  exit 1
fi

# Start the application with the specified port
echo "Starting the application on port $EXPO_PORT"
npm start -- --port $EXPO_PORT