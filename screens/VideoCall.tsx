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
    <a href='https://appcall.daily.co/visio'>Démarré la visio</a>
  );
};

export default VideoCallWeb;
