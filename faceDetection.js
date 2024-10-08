async function loadFaceModels() {
  try {
    // Load models from the 'models' directory
    await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    console.log('Face models successfully loaded');
  } catch (error) {
    console.error('Error loading face models:', error);
  }
}

// Detect face in the captured image
async function detectFace(canvas) {
  try {
    const detections = await faceapi.detectAllFaces(canvas)
                                   .withFaceLandmarks()
                                   .withFaceDescriptors();

    if (detections.length > 0) {
      document.getElementById('output').innerText = `Detected ${detections.length} face(s).`;
      extractFaceParameters(detections[0].descriptor);
    } else {
      document.getElementById('output').innerText = "No face detected.";
    }
  } catch (error) {
    console.error("Error detecting face:", error);
  }
}

// Load models on page load
loadFaceModels();
