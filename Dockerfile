# Use the official MongoDB image as the base image
FROM mongo:7.0.5

# Create a directory for the MongoDB data
RUN mkdir -p /data/db

# Expose the default MongoDB port
EXPOSE 27017

# Start MongoDB
CMD ["mongod"]
