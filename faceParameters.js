// Extracts face parameters (face descriptor) and logs them
function extractFaceParameters(faceDescriptor) {
  const parameters = faceDescriptor.map(num => num.toFixed(4));
  document.getElementById('output').innerText += `\nFace Parameters: ${parameters.join(', ')}`;
  
  // Save the parameters locally or for further use
  saveFaceParameters(parameters);
}

// Saving parameters in local storage (for demo purposes)
function saveFaceParameters(parameters) {
  const storedParameters = JSON.parse(localStorage.getItem('savedFaces')) || [];
  storedParameters.push(parameters);
  localStorage.setItem('savedFaces', JSON.stringify(storedParameters));
}
