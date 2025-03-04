# 3D Solar System Configurator

**Warning:**  
Sorry for the inconvenience—the initial deployment on Vercel may not work as expected due to configuration issues. We recommend running this project locally for the best experience.

**Note:**  
This project uses two main buttons:
- **Save Configuration:** Saves (or overwrites) the current solar system configuration to Firebase Firestore.
- **Load Configuration:** Loads the latest saved configuration from Firebase Firestore.

When using the control panel, you can adjust planet properties (size, speed, and orbit distance) via sliders. After making your changes, click "Save Configuration" to update the database. The "Load Configuration" button fetches and displays the latest settings from the database.

---

## Overview

The 3D Solar System Configurator is an interactive web application built using React, Three.js (via react‑three‑fiber), and Firebase Firestore. The project lets users:
- **Visualize a 3D Solar System:** Including the Sun (which rotates) and several orbiting planets.
- **Adjust Planet Properties:** Change each planet's size, orbital speed, and orbit distance in real time through a control panel.
- **Persist Configurations:** Save and load the planetary configurations to/from a Firebase Firestore database.

---

## Features

- **Interactive 3D Visualization:** The solar system is rendered in 3D with orbit rings for each planet.
- **Real-time Control Panel:** Adjust properties of individual planets (size, speed, orbit distance) dynamically.
- **Firebase Integration:** Save the current configuration to Firestore (overwriting the existing document) and load the latest configuration.
- **Orbit Navigation:** Use OrbitControls to rotate, pan, and zoom in the 3D scene.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or above)
- [npm](https://www.npmjs.com/) (or yarn)
- A Firebase project with Firestore enabled

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/solar-system-configurator.git
   cd solar-system-configurator
Install dependencies:

bash
Copy
Edit
npm install
Firebase Setup:

Create a file named firebaseConfig.js in the src folder and add your Firebase credentials:

javascript
Copy
Edit
// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
Run the development server:

bash
Copy
Edit
npm run dev
Usage
Control Panel
Adjust Planet Values:
Use the sliders to change a planet's size, speed, and orbit distance. Changes are reflected immediately in the 3D scene.

Save Configuration:
Click the Save Configuration button in the control panel. This overwrites the existing configuration in Firebase Firestore with your current settings.

Load Configuration:
Click the Load Configuration button to retrieve and display the latest saved configuration from Firebase.

3D Scene
Navigation:
Use your mouse (click and drag, scroll, etc.) to rotate, pan, and zoom in the scene.
Visual Elements:
The scene features a rotating Sun, orbit rings for each planet, and the planets themselves that move along their orbits.
Project Structure
cpp
Copy
Edit
/src
  ├── App.jsx             // Main application component (state & Firebase integration)
  ├── SolarSystem.jsx     // Renders the 3D scene (Sun, orbit rings, planets)
  ├── Planet.jsx          // Component for individual planet rendering and orbit simulation
  ├── ControlPanel.jsx    // Control panel UI for adjusting planet properties & saving/loading data
  ├── firebaseConfig.js   // Firebase configuration file
Firebase Integration
This project uses Firebase Firestore for data persistence. The configuration is stored in a single document with a fixed ID (solarSystemConfig) inside the solarSystems collection. When you save your configuration, the existing document is overwritten; when you load, the latest configuration is retrieved.

Deployment
Warning:
The initial deployment on Vercel may not work as expected due to configuration issues. Ensure you have set all environment variables and Firebase settings correctly if you wish to deploy.

Contributing
Contributions are welcome! Please fork the repository and open a pull request with your improvements or bug fixes.

