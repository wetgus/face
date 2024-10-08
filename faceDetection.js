// Load the models asynchronously
async function loadFaceModels() {
  try {
    // Ensure the face-api.js library is loaded before trying to use 'faceapi'
    if (typeof faceapi === 'undefined') {
      throw new Error('face-api.js is not loaded');
    }
    
    // Load the models from the /models directory
    await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');

    console.log('Face models successfully loaded');
  } catch (error) {
    console.error('Error loading face models:', error);
  }
}

// Detect faces from the captured image
async function detectFace(canvas) {
  try {
    if (typeof faceapi === 'undefined') {
      throw new Error('face-api.js is not loaded');
    }

    const detection = await faceapi.detectSingleFace(canvas).withFaceLandmarks().withFaceDescriptor();
    if (!detection) {
      document.getElementById('output').innerText = 'No face detected';
      return null;
    }
    document.getElementById('output').innerText = 'Face detected!';
    return detection.descriptor;
  } catch (error) {
    console.error('Error detecting face:', error);
  }
}

// Call loadFaceModels when the page loads
document.addEventListener('DOMContentLoaded', loadFaceModels);
