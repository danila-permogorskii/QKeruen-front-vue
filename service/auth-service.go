package service

import "qkeruen/repository"

type AuthService interface {
	Check(contact, role string) (bool, error)
	Create(contact string, code string) error
	ValidateSMS(contact string, code_validate string) (bool, error)
}

type authService struct {
	db repository.Database
}

func NewAuthService(ds repository.Database) *authService {
	return &authService{
		db: ds,
	}
}

func (s *authService) Check(contact, role string) (bool, error) {
	res, err := 0, 0
}

func (s *authService) Create(contact string, code string) error

func (s *authService) ValidateSMS(contact string, code_validate string) (bool, error)
