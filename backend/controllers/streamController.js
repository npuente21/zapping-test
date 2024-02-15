const m3u8 = require('m3u8');
const fs = require('fs');
const pool = require('../config/dbConfig');

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


const getMediaSequence = async ()=>{
    const query = `SELECT media_sequence FROM streams WHERE id = 1;`;
    const result = (await pool.query(query)).rows[0].media_sequence;
    return result
};

const updateMediaSequence = async (mediaSequence)=>{
    const query = `UPDATE streams SET media_sequence = ${mediaSequence} WHERE id = 1;`;
    const result = await pool.query(query);
    if(result.rowCount === 0) return false;
    else return true;
}

setInterval(async () => {
    let mediaSequence = await getMediaSequence();
    const segmentCount = countSegments();
    if(segmentCount > mediaSequence){
        mediaSequence +=1;
        await updateMediaSequence(mediaSequence);
    }
}, 1000 * SEGMENT_DURATION);

const streamController = async (req, res) => {
    const mediaSequence = await getMediaSequence();
    const m3u = m3u8.M3U.create();
    m3u.set('EXT-X-VERSION', 3);
    m3u.set(`EXT-X-TARGETDURATION`, SEGMENT_DURATION);
    m3u.set('EXT-X-MEDIA-SEQUENCE', mediaSequence);
    let endlist = false;
    for (let i = 0; i < SEGMENT_COUNT; i++) {
        if (mediaSequence + i >= countSegments()) {
            console.log('endlist, mediaSequence: ', mediaSequence, 'i: ', i);
            m3u.set('EXT-X-ENDLIST', true);
            endlist = true;
            break;
        }
        m3u.addPlaylistItem({
            duration: SEGMENT_DURATION,
            uri: `segment${mediaSequence + i}.ts`
        });
    }
    res.status(200).send(m3u.toString());   
    if(endlist){
        setTimeout(()=>{
            updateMediaSequence(0).then((result)=>{
                if(result){
                    console.log('Media sequence restored to 0');
                }
            }).catch(()=>{
                console.log('Error updating media sequence');
            });
        }, 1000);
        
    }
}

module.exports = {streamController};