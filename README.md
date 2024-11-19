# Social NetWork API

## Description 
The Social Network API is a backend service built from scratch for a social network web application. It allows users to share their thoughts, react to friends' thoughts, and create a friend list. This API handles user authentication, data storage, and retrieval, ensuring secure and efficient communication between the client and the server.

## Table of Contents 
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [Questions](#questions)

## Installation
To install the Social Network API, follow these steps:

1. Clone the repository:
    git clone git@github.com:Adonis99Jordan/social_network.git

2. Navigate to the project directory:
    cd social_network

3. Install the dependencies:
    npm install

4. Start the development server:
    npm run dev

## Usage
To use the Social Network API, follow these steps:

1. Ensure MongoDB is running and accessible.
2. Start the development server using the command above.
3. Use a tool like Insomnia to interact with the API endpoints.

## API Endpoints
The Following are the main API endpoints provided by the back end:

## Users
- `GET /api/users`: Get all users
- `GET /api/users:id`: Get a user by ID
- `POST /api/users`: Create a new user
- `PUT /api/users/:id`: Update a user by ID
- `DELETE /api/users/:id`: Delete a user by ID
- `PUT /api/users/:userId/friends/:friendId`: Add a friend
- `DELETE /api/users/:userId/friends/:friendId`: Remove a friend 

## Thoughts 
- `GET /api/thoughts`: Get all thoughts
- `GET /api/thoughts/:id`: Get a thought by ID
- `POST /api/thoughts`: Create a new thought
- `PUT /api/thoughts/:id`: Update a thought by ID
- `DELETE /api/thoughts/:id`: Delete a thought by ID

## Reactions 
- `POST /api/thoughts/:id/reactions`: Add a reaction to a thought
- `DELETE /api/thoughts/:id/reactions/:reactionId`: Delete a reaction from a thought

## Technologies used 
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT 
- TypeScript

## Contributing 
Constributions are Welcome! Please feel free to submit a pull request for any improvements or bug fixes.

## Questions 
If you have any questions, please feel free to contact me:

- GitHub: [Adonis99Jordan](https://github.com/Adonis99Jordan)
- Email: AdonisJZepeda@gmail.com