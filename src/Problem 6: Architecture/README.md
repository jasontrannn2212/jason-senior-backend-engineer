## Leaderboard Backend Module

The Leaderboard Backend Module provides the backend services necessary to manage and display a live-updating scoreboard. It facilitates secure and efficient user score updates, ensures data integrity, and enables real-time leaderboard updates. Leveraging Redis for its high-performance in-memory capabilities, this module is designed for scalability and responsiveness.

### Features

- **Authorization and Authentication**:
  - Ensures only authenticated and authorized users can modify scores.
  - Implements role-based access control to restrict sensitive operations.
- **Score Management**:
  - Incremental updates to user scores based on predefined actions.
  - Accurate tracking and ranking of users in real-time.
- **API for Score Updates**:
  - RESTful APIs for score updates and leaderboard retrieval.
  - Rate-limited and secured against abuse.
- **Real-Time Updates**:
  - Broadcasting score updates to all connected clients via WebSockets for immediate visibility.
- **Redis Integration**:
  - Utilizes Redis Sorted Sets for fast and efficient leaderboard management.
  - Ensures low-latency score retrieval and updates.

### System Requirements

- **Backend**:
  - Node.js: Version 20.9.0 (LTS)
  - Express.js: For API routing.
  - Redis: For in-memory data storage and leaderboard management.
- **Security**:
  - JWT: Token-based authentication for API access.
  - (Optional) OAuth2.0: Optional integration for external authentication providers.
- **Real-Time Communication**:
  - WebSockets: For push-based updates to connected clients.
  - Polling (Fallback): Periodic requests to fetch updated leaderboard data if WebSockets are unavailable.

### Setup

#### Step 1: Install and Set up with Docker

1. Install Docker.
2. Create a Dockerfile.
3. Create a `docker-compose.yml`.
4. Set up environment variables.
5. Build and run the containers.

#### Step 2: Configure Redis

1. Set up a Redis client and configure it in the backend.
2. Use Redis Sorted Sets (ZSETs) for leaderboard storage:
   - `ZADD`: Adds or updates a user’s score.
   - `ZINCRBY`: Increments scores based on user actions.
   - `ZRANGE`: Retrieves the top scores in descending order.

#### Step 3: Authentication Setup

1. Integrate a robust authentication mechanism to ensure API security:
   - JWT: Validate tokens in the Authorization header of requests.
   - Middleware: Add middleware for token validation and role-based access control.

#### Step 4: Rate Limiting

Prevent score update abuse by implementing rate limiting for the score increment API using the library `express-rate-limit`.

### API Documentation

#### POST /api/v1/scores/increase

**Description**

Updates the user’s score after the action is completed.

**Note**

`userId` will be extracted from Payload of User Access Token

**Request Parameters**

- `actionId` (string) - required: The action triggering the score increment.
- `scoreIncrement` (number) - required: The points to be added to the user’s score.

**Response**

- Status Code: 201
- Body:

```json
{
  "success": true,
  "newScore": 120,
  "message": "Score updated successfully."
}
```

**Security**

- Validate JWT tokens for authentication.
- Ensure the user can only modify their own scores.
- Prevent duplicate updates by tracking completed actions.

#### GET /api/v1/scores/top

**Description**

Fetches the top 10 user scores.

**Response**

- Status Code: 201
- Body:

```json
{
  "data": [
    { "userId": "user1", "score": 500 },
    { "userId": "user2", "score": 450 }
  ]
}
```

**Security**

Validate JWT tokens for authentication.

## Real-Time Updates

#### WebSockets

- Establish a WebSocket server to broadcast leaderboard changes.
- Push updated scores to all connected clients when a score changes.

#### Polling (Fallback)

- Implement periodic API calls (e.g., every 10 seconds) to fetch updates if WebSocket support is unavailable.

#### Handling Score Updates

When a user completes an action, the backend will:

- Validate the request and ensure the user is authenticated and authorized.
- Increment the user’s score using Redis commands (ZINCRBY).
- Broadcast the updated leaderboard to all connected clients via WebSockets.

## System Architecture Overview

To illustrate the flow of execution, we use a Sequence Diagram. Please refer to the `architecture-diagram.puml` file for the detailed diagram.

## Entities

- **Frontend**: Responsible for handling user interactions and displaying the leaderboard in real time.
- **Authentication Service**: Handles user authentication.
- **Backend API**: Processes requests, updates scores, and communicates with Redis to manage the leaderboard.
- **Redis**: Stores the leaderboard as a sorted set, where user IDs and associated scores are stored, and automatically maintains score ordering.
- **WebSocket**: Ensures real-time updates for clients with the latest leaderboard information.

## Note

I used PlantUML to draw the Sequence Diagram because it provides a clean and simple way to visualize the architecture without the need for manually drawing complex diagrams. Additionally, it can be easily integrated into the documentation process and shared with other team members.
