import React, { useState, useEffect } from "react";
import SolarSystem from "./SolarSystem";
import ControlPanel from "./ControlPanel";
import { db } from "./firebaseConfig";
import { doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";

const CONFIG_DOC_ID = "solarSystemConfig"; // Fixed document ID

function App() {
  const [config, setConfig] = useState([
    { name: "Mercury", size: 0.08, speed: 0.5, orbitDistance: 80, modelPath: "/mercury.glb" },
    { name: "Venus", size: 5, speed: 0.45, orbitDistance: 100, modelPath: "/venus.glb" },
    { name: "Earth", size: 100, speed: 0.4, orbitDistance: 150, modelPath: "/earth.glb" },
    { name: "Mars", size: 5, speed: 0.25, orbitDistance: 180, modelPath: "/mars.glb" },
    { name: "Jupiter", size: 0.08, speed: 0.2, orbitDistance: 220, modelPath: "/jupiter.glb" },
    { name: "Saturn", size: 0.08, speed: 0.18, orbitDistance: 280, modelPath: "/saturn.glb" },
    { name: "Neptune", size: 1, speed: 0.12, orbitDistance: 330, modelPath: "/neptune.glb" },
  ]);

  // Save config (overwrite existing)
  const saveConfigToFirebase = async () => {
    try {
      await setDoc(doc(db, "solarSystems", CONFIG_DOC_ID), { planets: config });
      console.log("Configuration saved!");
      alert("Configuration saved successfully!");
    } catch (error) {
      console.error("Error saving configuration:", error);
      alert("Failed to save configuration.");
    }
  };

  // Load config from Firebase
  const loadConfigFromFirebase = async () => {
    try {
      const docSnap = await getDoc(doc(db, "solarSystems", CONFIG_DOC_ID));
      if (docSnap.exists()) {
        setConfig(docSnap.data().planets);
        console.log("Configuration loaded:", docSnap.data().planets);
      } else {
        alert("No configuration found in Firebase.");
      }
    } catch (error) {
      console.error("Error loading configuration:", error);
      alert("Failed to load configuration.");
    }
  };

  // Auto-load config on start
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "solarSystems", CONFIG_DOC_ID), (docSnap) => {
      if (docSnap.exists()) {
        setConfig(docSnap.data().planets);
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  return (
    <div className="relative w-screen h-screen bg-black">
      <SolarSystem config={config} />
      <ControlPanel config={config} setConfig={setConfig} />

      {/* Firebase Controls */}
      <div className="absolute top-5 left-5 flex flex-col space-y-2">
        <button onClick={saveConfigToFirebase} className="px-4 py-2 bg-blue-600 text-white rounded">Save Config</button>
        <button onClick={loadConfigFromFirebase} className="px-4 py-2 bg-green-600 text-white rounded">Load Config</button>
      </div>
    </div>
  );
}

export default App;
