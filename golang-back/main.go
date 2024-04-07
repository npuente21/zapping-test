package main

import (
	"github.com/gin-gonic/gin"
	"github.com/zapping-test/controllers"
	"github.com/zapping-test/routes"
)

func SetCORS() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func main() {
	go controllers.UpdateStream(1)
	r := gin.Default()
	r.Use(SetCORS())
	routes.SetupRoutes(r)

	r.Run(":8081")
}
