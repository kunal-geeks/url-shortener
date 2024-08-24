# URL Shortener Service

A powerful URL shortener API with analytics and advanced features including custom short codes, URL expiration, rate limiting, and background jobs for analytics processing.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project provides a URL shortener service that allows users to shorten URLs, track analytics, and handle redirects with advanced features. It includes rate limiting, Redis caching, and background job processing using Bull and Node.js.

## Features

- **Shorten URLs**: Create short codes for long URLs.
- **Redirect with Tracking**: Redirect users and track visit data.
- **Analytics**: Get detailed analytics on short URLs.
- **Custom Short Codes**: Specify custom short codes.
- **URL Expiration**: Set expiration for shortened URLs.
- **Rate Limiting**: Limit API requests to prevent abuse.
- **Background Jobs**: Process visit data asynchronously with Bull.
- **Redis Caching**: Cache analytics data to improve performance.

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/) (for development and testing)
- [Redis](https://redis.io/) (will be set up via Docker)

### Setup and Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/url-shortener.git
   cd url-shortener

2. **Install Dependencies**

```bash
Copy code
npm install
Run Docker Containers
```

3. **Start Redis and the application using Docker Compose:**

```bash
Copy code
docker-compose up
```

This command will start the Redis and application containers. Redis will be accessible at redis://redis:6379 and the application will run on port 5000.

- Environment Variables

Ensure you have a .env file in the root directory with the following variables:

```env
Copy code
PORT=5000
REDIS_URL=redis://redis:6379
MONGO_URI=mongodb://mongo:27017/url-shortener
Adjust these variables as needed for your environment.
```

**API Endpoints**
```bash
1. Shorten URL
Endpoint: POST /api/v1/urls/shorten

Description: Shorten a long URL and optionally set a custom short code and expiration time.

Request Body:

json
Copy code
{
  "originalUrl": "https://example.com",
  "customCode": "example123",
  "expiration": 3600
}
Response:

json
Copy code
{
  "shortCode": "example123"
}
```
2. **Redirect URL**
Endpoint: GET /api/v1/urls/:shortCode
Description: Redirect to the original URL based on the short code.
Response: Redirects to the original URL. If the short code is not found or the URL is expired, returns an appropriate error.

3. **Get Analytics**
```bash
Endpoint: GET /api/v1/urls/analytics/:shortCode

Description: Retrieve analytics data for a shortened URL.

Response:

json
Copy code
{
  "totalVisits": 123,
  "uniqueVisitors": 45,
  "deviceTypeBreakdown": {
    "mobile": 60,
    "desktop": 63
  },
  "referringWebsites": {
    "example.com": 30,
    "anotherexample.com": 15
  },
  "timeSeriesData": [
    {"timestamp": "2024-08-23T00:00:00Z", "visits": 10},
    {"timestamp": "2024-08-24T00:00:00Z", "visits": 20}
  ]
}
```
**Testing**
Unit Tests
```bash
Run unit tests with Jest:

bash
Copy code
npm test
Postman Collection

Import the provided Postman collection to test the API endpoints. Postman Collection

Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes. Make sure to follow the coding style and include tests for new features.

License
This project is licensed under the MIT License - see the LICENSE file for details.

csharp
Copy code

Replace the placeholders such as `https://github.com/your-username/url-shortener.git` with the actual repository URL and adjust paths as needed. This `README.md` provides a comprehensive guide to setting up, running, and testing your URL shortener application.
```




