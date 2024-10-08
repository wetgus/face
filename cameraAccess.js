const video = document.getElementById('video');

// Request access to the user's webcam
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (error) {
    console.error("Error accessing webcam:", error);
    document.getElementById('output').innerText = "Webcam access denied!";
  }
}

// Capture the photo from the video feed
function takePhoto() {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  
  // Draw the current video frame onto the canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
  // Pass the captured canvas image to the face detection function
  detectFace(canvas);
}

document.getElementById('takePhoto').addEventListener('click', takePhoto);

// Start the camera on page load
startCamera();
