const m3u8 = require('m3u8');
const fs = require('fs');

const SEGMENT_DURATION = 10;
const SEGMENT_COUNT = 3;

const countSegments = () => {
    let count = 0;
    const dir = `${__dirname}/../public/videos`;
    fs.readdirSync(dir).forEach(file => {
        if(file.includes('segment') && file.includes('.ts')){
            count++;
        }
    });
    return count;

}

let mediaSequence = 0;

setInterval(() => {
    const segmentCount = countSegments();
    if(segmentCount > mediaSequence){
        mediaSequence +=1;
    }
}, 1000 * SEGMENT_DURATION);

const streamController = async (req, res) => {

    const m3u = m3u8.M3U.create();
    m3u.set('EXT-X-VERSION', 3);
    m3u.set(`EXT-X-TARGETDURATION`, SEGMENT_DURATION);
    m3u.set('EXT-X-MEDIA-SEQUENCE', mediaSequence);
    for (let i = 0; i < SEGMENT_COUNT; i++) {
        if (mediaSequence + i >= countSegments()) {
            console.log('endlist, mediaSequence: ', mediaSequence, 'i: ', i);
            m3u.set('EXT-X-ENDLIST', true);
            break;
        }
        m3u.addPlaylistItem({
            duration: SEGMENT_DURATION,
            uri: `segment${mediaSequence + i}.ts`
        });
    }
    res.status(200).send(m3u.toString());   
}

module.exports = {streamController};