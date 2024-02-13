#!/bin/bash
# Check if command-line argument is provided
if [ $# -eq 0 ]; then
  # No argument provided, run the default command (application)
  exec "$@"
elif [ "$1" == "test" ]; then
  # Run tests if "test" argument provided
  npm test
else
  # Run the provided command
  exec "$@"
fi
