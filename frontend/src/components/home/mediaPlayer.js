import React, { useState, useEffect } from 'react';
import Hls from 'hls.js';

function MediaPlayer() {
  const [hlsPlayer, setHlsPlayer] = useState(null);
  
  useEffect(() => {
    const fetchPlayList = async () => {
      const video = document.getElementById('video');
      if (!video) {
        console.error('No video element found');
        return;
      }
      if (Hls.isSupported()) {
        console.log('HLS supported');
      } else {
        console.error('HLS not supported');
        return;
      }
      const hls = new Hls({
        liveDurationInfinity: true,
        autoStartLoad: true,
        xhrSetup: (xhr, url) => {
          xhr.withCredentials = true;
        }
        
      });
      
      hls.loadSource('http://localhost:8080/public/videos/segment.m3u8',);

      hls.attachMedia(video);

      setHlsPlayer(hls);
      video.addEventListener('ended', () => {
        alert('video ended');
      });
      
    };




    fetchPlayList();
    return () => {
      if (hlsPlayer) {
        console.log('destroying hls player');
        hlsPlayer.destroy();
      }   
    }
  }
  , []);

 

  return (
    <div>
      <h1>Reproductor HLS en React</h1>
      <video id='video' controls style={{maxWidth:1000, maxHeight:1500}}/>
    </div>
  );
}

export default MediaPlayer;