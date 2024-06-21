import React, { useEffect, useRef } from 'react';

const VideoCallWeb = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const getMedia = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    };
    getMedia();
  }, []);

  return (
    <><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxWidth: '600px' }} />
    </div><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        en attente de l'appel
      </div></>
  );
};

export default VideoCallWeb;
