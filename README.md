# Chat Application

## Overview
This is a real-time chat application built with React for the frontend and Node.js with Express for the backend. The application allows users to communicate in real-time using WebSocket technology.

## Features
- User authentication
- Real-time messaging
- User presence tracking
- Responsive design

## Technologies Used
- **Frontend**: 
  - React
  - Vite
  - Socket.IO
  - Axios
  - Styled-components
  - FontAwesome icons

- **Backend**: 
  - Node.js
  - Express
  - MongoDB (using Mongoose)
  - Socket.IO

## Installation

### Prerequisites
- Node.js
- MongoDB

### Clone the repository
```bash
git clone <repository-url>
cd chatApp
```

### Install dependencies
For the server:
```bash
cd server
npm install
```

For the client:
```bash
cd public
npm install
```

### Environment Variables
Create a `.env` file in the `server` directory and add the following:
```
MONGO_URL=<your-mongodb-connection-string>
PORT=5000
```

## Running the Application
To start the server:
```bash
cd server
npm start
```

To start the client:
```bash
cd public
npm run dev
```

## Usage
- Navigate to `http://localhost:5173` to access the chat application.
- Users can register, log in, and start chatting in real-time.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
This project is licensed under the ISC License.
