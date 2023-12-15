import React, { useState, useRef } from 'react';
import axios from 'axios';

function CameraUploader() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [imageData, setImageData] = useState(null);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [captureTimerId, setCaptureTimerId] = useState(null);
  const [countdownTimerId, setCountdownTimerId] = useState(null);
  const [countdown, setCountdown] = useState(5); // Waktu mundur dimulai dari 5

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setCameraStarted(true);

      // Mulai timer setelah kamera dimulai
      const captureId = setInterval(takePicture, 15000); // Ambil gambar setiap 5 detik
      setCaptureTimerId(captureId);

      // Mulai waktu mundur
      setCountdown(15);
      const countdownId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      setCountdownTimerId(countdownId);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;

        // Close the MediaStream
        stream.getTracks().forEach(track => track.stop());
      }
    }
    setCameraStarted(false);

    // Hentikan timer saat kamera dihentikan
    clearInterval(captureTimerId);
    clearInterval(countdownTimerId);
    setCaptureTimerId(null);
    setCountdownTimerId(null);
  };

  const takePicture = async () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      const dataUrl = canvas.toDataURL('image/jpeg');
      setImageData(dataUrl);

      // Atur ulang waktu mundur setelah mengambil gambar
      setCountdown(15);

      // Unggah gambar setelah diambil
      if (dataUrl) {
        const blob = await fetch(dataUrl).then((r) => r.blob());

        const formData = new FormData();
        formData.append('file', blob, 'uploaded.jpg');

        try {
          await axios.post('http://localhost:8000/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          // alert('Gambar berhasil diunggah.');
        } catch (error) {
          console.error('Error mengunggah gambar:', error);
        }
      }
    }
  };

  return (
    <div>
      <h3>Camera Uploader</h3>
      {!cameraStarted ? (
        <button onClick={startCamera}>Start Camera</button>
      ) : (
        <>
          <button onClick={stopCamera}>Stop Camera</button>
          <p>Countdown: {countdown}</p>
        </>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <video ref={videoRef} autoPlay />
      {/* <img src={imageData} alt="Captured" style={{ width: '200px' }} /> */}
    </div>
  );
}

export default CameraUploader;
