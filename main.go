package main

import (
	"qkeruen/config"
	"qkeruen/models"

	"github.com/gin-gonic/gin"
)

var (
	AppSettings models.Settings
)

var dbPoll, _, err = config.NewDBPool(config.DataBaseConfig{
	Username: "postgres",
	Password: "123456",
	Hostname: "localhost",
	Port:     "5432",
	DBName:   "test",
})

func main() {
	r := gin.Default()

	r.GET("/get", func(ctx *gin.Context) {
		ctx.JSON(200, "Hello")
	})

	r.Run(":8080")
}
