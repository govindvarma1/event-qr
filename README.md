# Event QR

Event QR is a versatile web application designed to streamline QR code scanning functionalities for various events and scenarios. Developed in a short span of time. Whether you're organizing an event, managing access control, or tracking attendance, Event QR Web Service offers a seamless solution for efficiently handling QR code interactions.

Utilized initially for the Ugadi Event organized by the Telugu Cultural Association at Jawaharlal Nehru University, New Delhi, in 2024, Event QR Web Service proved its effectiveness in validating food coupons. However, its capabilities extend far beyond this single event, with the potential to cater to a wide range of applications requiring QR code scanning.

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
  - Google APIs

---

## Features

1. **QR Code Scanning**: The frontend enables users to scan QR codes using the device's camera for various use cases.

2. **Google Sheets Integration**: The backend interacts with Google Sheets to store scanning details. This functionality can be extended to accommodate different data storage solutions.

3. **Customizable Use Cases**: The application is designed to be easily customizable for different events or scenarios requiring QR code scanning.

4. **Google API Integration**: Users need to create Google API keys from the Google Developer Console and save the JSON file in the root directory of the backend code to use the application. This allows seamless integration with Google Sheets.

5. **Future Development**: The project is intended to be more generic in the future, catering to a wider range of use cases beyond the current implementation. Stay tuned for updates as the project evolves to become a general-purpose QR code scanning solution.

---

## Setup Instructions

1. **Create Google API Keys**:
   - Visit the Google Developer Console and create API keys required for accessing Google APIs.
   - Ensure that you enable the necessary APIs such as Google Sheets API.

2. **Save JSON File in Backend Directory**:
   - Download the JSON file containing the API credentials from the Google Developer Console.
   - Save this JSON file in the root directory of the backend code.
   - Ensure that the filename matches the expected filename in your backend code configuration.

3. **Google Sheets Integration**:
   - The application exclusively utilizes Google Sheets for storing QR codes and associated details.
   - Ensure that you grant the necessary permissions and set up the Google Sheets accordingly to accommodate the data.

4. **Future Development**:
   - The project is intended to be more generic in the future, catering to a wider range of use cases beyond the current implementation.
   - Stay tuned for updates as the project evolves to become a general-purpose QR code scanning solution.

5. **Install dependencies for both frontend and backend**:
   - Navigate to the `frontend` directory and install dependencies:

     ```
     cd frontend
     npm install
     ```

   - Navigate to the `backend` directory and install dependencies:

     ```
     cd ../backend
     npm install
     ```

6. **Set up environment variables**:
   - Create a `.env` file in the backend directory and define the necessary environment variables, such as API keys and Google Sheets credentials.

7. **Run the backend server**:
   - Navigate to the `backend` directory and start the server:

     ```
     npm start
     ```

8. **Run the frontend development server**:
   - Navigate to the `frontend` directory and start the development server:

     ```
     cd ../frontend
     npm start
     ```

---

Ensure that you follow these steps to properly set up the application environment and integrate it with Google Sheets for storing QR codes and associated details. Stay updated for future enhancements and the transition towards a more versatile and general-purpose QR code scanning solution.

---

## Usage

1. Customize the application for your specific use case by modifying the frontend and backend code as needed.

2. Utilize the QR code scanning functionality for various scenarios by adapting the frontend and backend logic accordingly.

3. Make use of Google Sheets integration for storing scanning details. Ensure that proper authentication and authorization mechanisms are in place to protect sensitive data.

---

## Contributing

Contributions to Event QR Web Service are welcome! To contribute, follow these steps:

1. Fork the repository.

2. Create a new branch for your feature or bug fix.

3. Commit your changes and push to your branch.

4. Submit a pull request detailing your changes.

---

## License

This project is licensed under the [MIT License](LICENSE). Feel free to modify and distribute it as per the terms of the license.

---
