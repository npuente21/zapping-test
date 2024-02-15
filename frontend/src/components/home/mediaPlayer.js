import React, { useState, useEffect } from 'react';
import Hls from 'hls.js';
import { Alert } from 'antd';

import './media.css';
function MediaPlayer() {
  const [hlsPlayer, setHlsPlayer] = useState(null);
  const [end, setEnd] = useState(false);
  
  useEffect(() => {
    const fetchPlayList = async () => {
      const video = document.getElementById('video');
      if (!video) {
        console.error('No video element found');
        return;
      }
      if (Hls.isSupported()) {
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
        
      } else {
        console.error('HLS not supported');
        return;
      }
      
      video.addEventListener('ended', () => {
        setEnd(true);
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
      <h1>Streaming</h1>
      <video id='video' autoPlay={true} controls style={{maxWidth:1000, maxHeight:1500}}/>
      {end && <Alert closable message="El streaming ha terminado!!" type="success" style={{fontSize:30}} showIcon />}
    </div>
  );
}

export default MediaPlayer;