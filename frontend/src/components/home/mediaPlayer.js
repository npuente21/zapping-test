import React, { useState, useEffect } from 'react';
import Hls from 'hls.js';
import { Alert, Typography } from 'antd';

import Timer from './timer';
import './media.css';
function MediaPlayer(props) {
  const {streamData} = props;

  const [hlsPlayer, setHlsPlayer] = useState(null);
  const [end, setEnd] = useState(false);
  
  useEffect(() => {
    const fetchPlayList = async () => {
      const video = document.getElementById('video');
      if (!video) {
        console.error('No video element found');
        return;
      }
      if (Hls.isSupported() && streamData.manifiest_url) {
          const hls = new Hls({
            liveDurationInfinity: true,
            autoStartLoad: true,
            xhrSetup: (xhr, url) => {
              xhr.withCredentials = true;
            }
            
          });
          
          hls.loadSource(streamData.manifiest_url);
    
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            console.log('manifest loaded, found ' + hls.levels.length + ' quality level')
          }
          );    
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
  , [streamData.manifiest_url]);

 

  return (
    <div>
      <Typography.Title level={1}>{streamData.title}</Typography.Title>
      <video id='video' autoPlay={true} controls style={{maxWidth:1000, maxHeight:1500}}/>
      <div style={{display: 'flex', flexDirection: 'row'}}>
      <Timer startedTime ={streamData.started_time} stop={end}/>
      <p style={{marginLeft: 30}}>{streamData.description}</p>
      </div>
      
      
      {end && <Alert closable message="El streaming ha terminado!!" type="success" style={{fontSize:30}} showIcon />}
    </div>
  );
}

export default MediaPlayer;