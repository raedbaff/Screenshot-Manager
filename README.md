# Periodic Screenshot Tracking Application

This application is a MERN stack-based periodic screenshot tracking system, designed to capture and display screenshots at regular intervals. The frontend is built using React, and the backend is powered by Express.js, MongoDB, and Node.js. The application also includes Electron for desktop functionalities.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [User Guide](#user-guide)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

## Features

- Capture screenshots at regular intervals.
- Display captured screenshots in a web interface.
- Store screenshot data in MongoDB.
- Electron integration for desktop functionalities.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Git

## Installation

### Clone the repository

```bash
git clone https://github.com/raedbaff/Screenshot-Manager.git
cd your-repository
```
### Install Frontend dependencies

```bash
cd frontend
npm install
```
### Install Backend dependencies

```bash
cd backend
npm install
```
## Configuration

### MongoDB Setup

1. **Log in to MongoDB:**
   - Go to the [MongoDB website](https://www.mongodb.com/) and log in to your account. If you don't have an account, create one.

2. **Create a new project:**
   - In the MongoDB dashboard, click on "Create a New Project" and provide a name for your project.

3. **Create a new cluster:**
   - Inside the project, click on "Build a Cluster". Choose your preferred settings (e.g., cloud provider, region) and deploy the cluster.

4. **Get the connection string:**
   - Once the cluster is ready, click on "Connect" in the cluster dashboard.
   - Select "Connect your application".
   - Copy the connection string provided. It will look something like this:

     ```plaintext
     mongodb+srv://<username>:<password>@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
     ```

### Environment Variables

1. Create a `.env` file in the root of your `backend` directory and add the following environment variables:

```env
MONGO_URL=your_mongo_connection_string
PORT=4000
```

- Replace your_mongo_connection_string with the connection string you copied from MongoDB.
- Adjust the PORT if necessary, especially if you want to run the server on a different port.

### Example .env file

```env
MONGO_URI=mongodb+srv://user:password@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority
PORT=4000
```

2. Create a `.env` file in the root of your `frontend` directory and add the following environment variables:

```env
REACT_APP_BACKEND_URL=REACT_APP_BACKEND_URL
```
### Example .env file

```env
REACT_APP_BACKEND_URL=http://localhost:4000

```
- Adjust `PORT` with the PORT value you provided inside backend `.env` file

## Running the Application

### Start the Backend Server

Navigate to the `backend` directory and start the server:

```bash
cd backend
npm start
```
- To make sure the backend is working correctly ensure you see these 3 console logs 
```bash
successfully connected to remote mongoDB
listening on port 4000 (depends on PORT you are using)
created bucket
```

### Start the Frontend Development Server alongside electron app

Navigate to the `frontend` directory and start the server:

```bash
cd frontend
npm run start:electron
```
- This will start both `react` web app and `electron` desktop app

## User Guide

### React App

The React app provides a visualization of the captured screenshots. Here’s how to use it:

1. **Viewing Captured Screenshots**
   - Once the backend server is running and capturing screenshots, you can view them in the React app.
   - Open your browser and navigate to `http://localhost:3000` (or whichever port your React app is configured to use).
   - The app will display a gallery or list of captured screenshots. You can view these images directly from the interface.

### Electron App

The Electron app provides additional functionalities for controlling the screenshot capture process. Here’s how to use it:

1. **Starting and Stopping Captures**
   - Open the Electron app, which runs alongside your React app.
   - Use the "Start Capture" button to begin taking screenshots at the specified interval.
   - To stop capturing screenshots, click the "Stop Capture" button. This will halt the screenshot process.

2. **Changing the Capture Interval**
   - The Electron app allows you to adjust the interval between each screenshot.
   - Use the input field or slider to set the desired interval in milliseconds (e.g., 5000 for 5 seconds).
   - After setting the interval, click the "Start Capture" button to apply the new interval setting.

The Electron app integrates with the React app, enabling you to manage the capture process and view results in the web interface.


## Folder Structure

The project is organized as follows:

```bash
SCREENSHOT-MANAGER/
├── backend/
│   ├── models/           # Contains Mongoose models
│   ├── routes/           # Contains Express.js routes
│   ├── controllers/      # Contains route handlers
│   ├── middleware/       # Contains middleware
│   ├── helpers/          # Contains helper functions
│   ├── .env              # Environment variables for the backend
│   ├── .env.example      # Environment variable example for the backend
│   ├── index.js          # Entry point for the backend server
│   └── ...               # Other backend-related files
├── frontend/
│   ├── src/              # Source code for the frontend React app
│   │   ├── components/  # React components
│   │   ├── electron/    # Electron-related files
│   │   │   ├── main.js  # Main process script for Electron
│   │   │   ├── preload.js # Preload script for Electron
│   │   │   ├── renderer.js # Renderer process script for Electron
│   │   │   ├── index.html # HTML file for the Electron app
│   │   │   └── ...       # Other Electron-related files
│   │   ├── App.js/       # App file
│   └── ...               # Other frontend-related files
│   ├── public/           # Public assets like index.html
│   ├── .env              # Environment variables for the frontend (if any)
│   └── ...               # Other frontend-related files
└── README.md             # Project documentation
```
## Technologies Used

### Frontend

- **React:** A JavaScript library for building user interfaces.
- **Tailwind CSS:** A utility-first CSS framework for styling the application.

### Backend

- **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js:** A web application framework for Node.js.
- **MongoDB:** A NoSQL database for storing screenshot data.

### Desktop Integration

- **Electron:** A framework for building cross-platform desktop applications with web technologies.

## Contributing

I welcome contributions to the project! To get started, please follow these steps:

1. **Fork the repository**
   - Click the "Fork" button at the top-right corner of the repository page on GitHub to create a copy of the repository under your account.

2. **Create your feature branch**
   - In your local copy of the repository, create a new branch for your changes:

     ```bash
     git checkout -b feature/your-feature-name
     ```

3. **Make your changes**
   - Implement your changes or features, ensuring to follow the project's coding style and guidelines.

4. **Commit your changes**
   - Commit your changes with a descriptive message:

     ```bash
     git add .
     git commit -m 'Add some feature or fix'
     ```

5. **Push to the branch**
   - Push your changes to your forked repository:

     ```bash
     git push origin feature/your-feature-name
     ```

6. **Create a Pull Request**
   - Go to the original repository on GitHub, switch to the "Pull Requests" tab, and click "New Pull Request".
   - Select your branch and submit the Pull Request, providing a clear description of the changes and the motivation behind them.

I appreciate your contributions and look forward to reviewing your pull requests!


