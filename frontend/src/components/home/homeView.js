import React from 'react';

import MediaPlayer from './mediaPlayer';

export default function HomeView(props) {
    const { userData } = props;
    return (
        <div style={{display: "flex", justifyContent:"center", alignContent:"center"}}>
        <MediaPlayer />
        </div>
    );
}