package controller

import (
	"net/http"
	"qkeruen/service"
	"strconv"

	"github.com/gin-gonic/gin"
)

type processController struct {
	ProcessService service.ProcessService
}

func NewProcessController(processService service.ProcessService) processController {
	return processController{ProcessService: processService}
}

func (c *processController) AcceptOrder(ctx *gin.Context) {
	orderId, _ := strconv.Atoi(ctx.Param("id"))

	res, err := c.ProcessService.AcceptOrder(orderId)

	if err != nil {
		ctx.JSON(http.StatusConflict, gin.H{"message": "error in accept order service."})
		return
	}

	ctx.JSON(200, res)
}

func (c *processController) CancellOrder(ctx *gin.Context) {
	orderId, _ := strconv.Atoi(ctx.Param("id"))

	if err := c.ProcessService.CancellOrder(orderId); err != nil {
		ctx.JSON(http.StatusConflict, gin.H{"message": "error in cancell order service."})
		return
	}

	ctx.JSON(200, "Cancelled.")
}

/*
func (c *processController) GetOrdersInProcessDriver(ctx *gin.Context)

func (c *processController) GetOrdersInProcessUser(ctx *gin.Context)

func (c *processController) FinishOrder(ctx *gin.Context)
*/
