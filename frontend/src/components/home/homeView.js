import React from 'react';

import MediaPlayer from './mediaPlayer';

export default function HomeView(props) {
    const { getStreamData, loadingGetStream, errorGetStream, streamData } = props;
    React.useEffect(() => {
        getStreamData(1);
    }, [getStreamData]);
    return (
        <div style={{display: "flex", justifyContent:"center", alignContent:"center"}}>
            {loadingGetStream 
            ? <p>Loading...</p> 
            : errorGetStream ? <p>{errorGetStream}</p>
            : Object.keys(streamData).length !== 0 && <MediaPlayer streamData={streamData}/>
            }
        </div>
    );
}