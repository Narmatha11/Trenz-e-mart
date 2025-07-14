// src/utils/detectPose.js

export const detectPoseLandmarks = async (img) => {
  console.log('Mock detectPoseLandmarks() called');

  // Return hardcoded dummy values in pixels based on your avatar size (e.g. 400x600)
  return {
    wrist: { x: 130, y: 450 }, // For watch position
    torso: { x: 150, y: 250 }, // For upper body clothing
    hip:   { x: 150, y: 400 }  // For dresses or pants
  };
};