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
    let updateQuery = `media_sequence = ${mediaSequence}`
    if(mediaSequence === 0){
        updateQuery += `, started_time = CURRENT_TIMESTAMP`;
    }   
    const query = `UPDATE streams SET ${updateQuery} WHERE id = 1;`;
    const result = await pool.query(query);
    if(result.rowCount === 0) return false;
    else return true;
}

setInterval(async () => {
    try{
        let mediaSequence = await getMediaSequence();
        const segmentCount = countSegments();
        if(segmentCount > mediaSequence){
            mediaSequence +=1;
            await updateMediaSequence(mediaSequence);
        }
    }catch(error){
        console.log('Error actualizando el media sequence', error);
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
        }, 1000*25);
        
    }
}

const createStream = async () => {
    try{
        const query = `INSERT INTO streams (id, title, description, media_sequence, manifiest_url)
        VALUES (1, 'El oso', 'En este stream se puede apreciar el camino del héroe del oso', 0,
        'http://localhost:8080/public/videos/segment.m3u8') ON CONFLICT (id) DO UPDATE SET started_time = CURRENT_TIMESTAMP, media_sequence= 0;`;
        const result = await pool.query(query);
        if(result.rowCount === 0) return false;
        else return true;
    }catch(error){
        console.log(1,error);
        return false;
    }

}

const getStreamData = async (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM streams WHERE id = ${id};`;
    const result = await pool.query(query);
    if(result.rowCount === 0){
        res.status(404).send('Stream not found');
    }
    else{
        res.status(200).send(result.rows[0]);
    }
}

module.exports = {streamController, createStream, getStreamData};