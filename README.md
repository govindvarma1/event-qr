# Event QR

Event QR is a versatile web application designed to streamline QR code scanning functionalities for various events and scenarios. Developed in a short span of time, it offers a seamless solution for efficiently handling QR code interactions.

## Contents

1. [Introduction](#introduction)
2. [Technologies Used](#technologies-used)
3. [Features](#features)
4. [Setup Instructions](#setup-instructions)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)

---

## Introduction

Event QR Web Service is built with a frontend developed using React and a backend developed using Node.js with Express. While its current implementation focuses on providing QR code scanning functionalities, it is designed to be easily adaptable for a wider range of use cases that involve QR code interactions.

---

## Technologies Used

- Frontend:
  - React
  - react-qr-reader

- Backend:
  - Node.js
  - Express
  - MongoDB
  - Google APIs

---

## Features

1. **QR Code Scanning**: The frontend enables users to scan QR codes using the device's camera for various use cases.
2. **Google Sheets Integration**: The backend interacts with Google Sheets to store and validate event details.
3. **Event Management**: Users can create, view, and manage events.
4. **Token-Based Authentication**: Secure login and registration system using JWT.
5. **Validation for Google Sheets**: The backend verifies the provided Google Sheet ID and Sheet Name during event creation.

---

## Setup Instructions

### Prerequisites

- Node.js and npm installed on your system.
- MongoDB database.
- Google Cloud account with access to Google Sheets API.

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following variables:
   ```env
   DB_URL=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   PORT=5000
   ```
4. Add your Google API credentials in a `google.json` file in the `backend` directory.
5. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` directory with the following variable:
   ```env
   VITE_BACKEND_URL=http://localhost:5000
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

---

## Usage

1. Open the frontend application in your browser (default: `http://localhost:5173`).
2. Register or log in to access the application.
3. Create events by providing valid Google Sheet ID and Sheet Name.
4. Scan QR codes and manage event details.

### Notes

- The UI currently requires significant improvements to enhance user experience.
- Ensure that the Google Sheet ID and Sheet Name are valid and accessible by the service account.

---

## Contributing

Contributions to Event QR are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push to your branch.
4. Submit a pull request detailing your changes.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---
