// Compare the current face descriptor with saved faces
function compareFace(currentDescriptor) {
  const savedFaces = JSON.parse(localStorage.getItem('savedFaces')) || [];
  
  if (savedFaces.length === 0) {
    document.getElementById('output').innerText += "\nNo saved faces to compare.";
    return;
  }

  // Compare with the stored face descriptors
  let closestMatch = null;
  let smallestDistance = Infinity;

  savedFaces.forEach(storedFace => {
    const distance = faceapi.euclideanDistance(currentDescriptor, storedFace);
    if (distance < smallestDistance) {
      smallestDistance = distance;
      closestMatch = storedFace;
    }
  });

  if (closestMatch && smallestDistance < 0.6) {
    document.getElementById('output').innerText += `\nMatch found! Distance: ${smallestDistance}`;
  } else {
    document.getElementById('output').innerText += "\nNo match found.";
  }
}
