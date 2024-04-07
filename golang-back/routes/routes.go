package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/zapping-test/controllers"
)

func SetupRoutes(router *gin.Engine) {
	router.GET("/segment.m3u8", controllers.GetMediaPlaylist)
	router.GET("/video/:id", controllers.GetStreamInfo)
	router.Static("/videos", "./videos")
}
