import React from 'react';

import MediaPlayer from './mediaPlayer';

export default function HomeView(props) {
    const { userData } = props;
    return (
        <div>
        <h1>Home</h1>
        <MediaPlayer />
        </div>
    );
}