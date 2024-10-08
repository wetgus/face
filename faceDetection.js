async function loadFaceModels() {
  await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
  await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
  await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
}

// Detect face in the captured image
async function detectFace(canvas) {
  const detections = await faceapi.detectAllFaces(canvas)
                                   .withFaceLandmarks()
                                   .withFaceDescriptors();

  if (detections.length > 0) {
    document.getElementById('output').innerText = `Detected ${detections.length} face(s).`;
    // Pass the face descriptor for further processing
    extractFaceParameters(detections[0].descriptor);
  } else {
    document.getElementById('output').innerText = "No face detected.";
  }
}

loadFaceModels();
