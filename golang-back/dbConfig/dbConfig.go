package dbConfig

import (
	"database/sql"

	_ "github.com/lib/pq"
)

func ConnectDB() *sql.DB {
	connStr := "user=myuser dbname=mydb password=mypassword sslmode=disable host=db port=5432"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	return db
}
