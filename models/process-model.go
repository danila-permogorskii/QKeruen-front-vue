package models

type ProcessModel struct {
	Id        int   `json:"id"`
	OrderId   int   `json:"orderId"`
	DriverId  int   `json:"driverId"`
	UserId    int   `json:"userId"`
	StartDate int64 `json:"startDate"`
}
