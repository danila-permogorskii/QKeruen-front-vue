package controller

import (
	"fmt"
	"net/http"
	"qkeruen/dto"
	"qkeruen/service"

	"github.com/gin-gonic/gin"
)

type authController struct {
	AuthService service.AuthService
	JWTService  service.JWTService
}

func NewAuthController(authservice service.AuthService, jwtService service.JWTService) authController {
	return authController{
		AuthService: authservice,
		JWTService:  jwtService,
	}
}

func (c *authController) Register(ctx *gin.Context) {
	var registerDTO dto.RequestRegisterDTO

	if err := ctx.ShouldBindJSON(&registerDTO); err != nil {
		ctx.JSON(
			http.StatusBadRequest, gin.H{
				"error": fmt.Sprintf("bad request: %v\n", err),
			},
		)
		// exit process
		return
	}

	token, err := c.JWTService.GenerateToken(registerDTO.PhoneNumber, registerDTO.Role)
	if err != nil {
		ctx.JSON(http.StatusConflict, gin.H{"message": "can not generate token"})
		return
	}

}

func (c *authController) ValidatorSMS(ctx *gin.Context) {
}
