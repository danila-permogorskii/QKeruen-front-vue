package repository

import (
	"context"
	"fmt"

	"github.com/jackc/pgconn"
	"github.com/jackc/pgx/v5"
)

// PgxIface is pgx interface
type PgxIface interface {
	// using pgxconn interface
	// Begin(context.Context) (pgx.Tx, error)
	// Exec(context.Context, string, ...interface{}) (pgconn.CommandTag, error)
	// QueryRow(context.Context, string, ...interface{}) pgx.Row
	// Query(context.Context, string, ...interface{}) (pgx.Rows, error)
	// Ping(context.Context) error
	// Prepare(context.Context, string, string) (*pgconn.StatementDescription, error)
	// Close(context.Context) error

	// using pgxpool interface
	Begin(context.Context) (pgx.Tx, error)
	Exec(context.Context, string, ...interface{}) (pgconn.CommandTag, error)
	QueryRow(context.Context, string, ...interface{}) pgx.Row
	Query(context.Context, string, ...interface{}) (pgx.Rows, error)
	Ping(context.Context) error
	Close()
}

type Database struct {
	DB PgxIface
}

func NewDatabase(db PgxIface) Database {
	return Database{
		DB: db,
	}
}

// Check
func (pool Database) CheckFromRepo(contact, role string) (bool, error) {
	q := fmt.Sprintf(`Select phone From %s WHERE phone=%s`, role, contact)

	row := pool.DB.QueryRow(context.Background(), q)

	var phone string
	err := row.Scan(&phone)
	if err != nil {
		return false, err
	}

	if phone == contact {
		return true, nil
	}

	return false, nil
}

// Create method will insert new record to database. 'C' part of the CRUD
func (pool Database) Insert(contact string, code int) error {
	// sql for inserting new record
	q := `INSERT INTO sms_cache(contact, code) VALUES($1,$2);`

	_, err := pool.DB.Query(context.Background(), q, contact, code)

	if err != nil {
		return err
	}

	return nil
}

func (pool Database) ValidateSMS(contact string) (int, error) {
	q := `Select code From sms_cache WHERE contact=$1;`

	row := pool.DB.QueryRow(context.Background(), q, contact)

	var code int

	err := row.Scan(&code)

	if err != nil {
		return 0, err
	}
	return code, nil
}
