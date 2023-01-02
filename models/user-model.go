package models

type UserModel struct {
	Id        int    `json:"id"`
	Phone     string `json:"phone"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Avatar    string `json:"avatar"`
	Token     string `josn:"token"`
}
