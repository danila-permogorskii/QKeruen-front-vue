package service

import (
	"qkeruen/repository"
)

type ProcessService interface {
	AcceptOrder(orderid int) (interface{}, error)
	CancellOrder(orderid int) error
	GetOrdersInProcessDriver()
	GetOrdersInProcessUser()
	FinishOrder(orderId int) error
}

type processService struct {
	db repository.ProcessDB
}

func NewProcessService(ds repository.ProcessDB) *processService {
	return &processService{db: ds}
}

func (s *processService) AcceptOrder(driverId, orderid int) (interface{}, error) {
	res, err := s.db.AcceptOrder(driverId, orderid)

	if err != nil {
		return nil, err
	}

	return res, nil
}

/*
func (s *processService) CancellOrder(orderid int) error

func (s *processService) GetOrdersInProcessDriver()

func (s *processService) GetOrdersInProcessUser()
func (s *processService) FinishOrder(orderId int) error
*/
