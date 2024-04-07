package controllers

import (
	"bytes"
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/zapping-test/dbConfig"
)

type Stream struct {
	ID             int16  `json:"id"`
	Title          string `json:"title"`
	Description    string `json:"description"`
	Media_sequence int16  `json:"media_sequence"`
	ManifiestURL   string `json:"manifiest_url"`
	StartedTime    string `json:"started_time"`
}

var cant_segments int16 = 64

func getMediaSequence(streamID int16) int16 {
	db := dbConfig.ConnectDB()
	defer db.Close()

	var mediaSequence int16
	err := db.QueryRow("SELECT media_sequence FROM streams WHERE id = $1", streamID).Scan(&mediaSequence)
	if err != nil {
		fmt.Println(err)
	}
	return mediaSequence
}

func updateMediaSequence(streamID int16, mediaSequence int16) {

	db := dbConfig.ConnectDB()

	defer func() {
		db.Close()
	}()
	updatedMediaSequence := mediaSequence + 1
	_, err := db.Exec("UPDATE streams SET media_sequence = $1 WHERE id = $2", updatedMediaSequence%cant_segments, streamID)
	if err != nil {
		fmt.Println(err)
	}
}

func UpdateStream(streamID int16) {

	ticker := time.NewTicker(2 * time.Second)
	defer func() {
		ticker.Stop()
		fmt.Println("terminé", getMediaSequence(streamID))
	}()
	for {
		select {
		case <-ticker.C:
			mediaSequence := getMediaSequence(streamID)
			updateMediaSequence(streamID, mediaSequence)
		}
	}
}

func GetStreamInfo(c *gin.Context) {
	db := dbConfig.ConnectDB()
	defer db.Close()

	var stream Stream
	err := db.QueryRow("SELECT * FROM streams WHERE id = 1").Scan(&stream.ID, &stream.Title, &stream.Description, &stream.Media_sequence, &stream.ManifiestURL, &stream.StartedTime)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(stream)
	c.IndentedJSON(200, stream)
}

func GetMediaPlaylist(c *gin.Context) {
	var buffer bytes.Buffer
	buffer.WriteString("#EXTM3U\n")
	buffer.WriteString("#EXT-X-VERSION:3\n")
	buffer.WriteString("#EXT-X-TARGETDURATION:10\n")
	buffer.WriteString("#EXT-X-MEDIA-SEQUENCE:0\n")

	for i := 0; i < 3; i++ {
		buffer.WriteString("#EXTINF:10.0,\n")
		buffer.WriteString(fmt.Sprintf("videos/segment%d.ts\n", i))
	}
	c.Data(200, "application/vnd.apple.mpegurl", buffer.Bytes())
}
