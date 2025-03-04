// firebaseHelpers.js
import { db } from "./firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

const CONFIG_DOC_ID = "solarSystemConfig"; // Fixed document ID

// Save configuration (overwrite existing entry)
export const saveConfigToFirebase = async (config) => {
  try {
    await setDoc(doc(db, "solarSystems", CONFIG_DOC_ID), { planets: config }, { merge: true });
    console.log("Configuration saved successfully!");
    alert("Configuration saved!");
  } catch (error) {
    console.error("Error saving configuration:", error);
    alert("Failed to save configuration. Check console for details.");
  }
};

// Load configuration (fetch only one entry)
export const loadConfigFromFirebase = async (setConfig) => {
  try {
    const docRef = doc(db, "solarSystems", CONFIG_DOC_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setConfig(docSnap.data().planets);
    } else {
      console.warn("No configuration found.");
    }
  } catch (error) {
    console.error("Error loading configuration:", error);
    alert("Failed to load configuration. Check console for details.");
  }
};
