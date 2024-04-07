package dbConfig

import (
	"database/sql"
	_ "github.com/lib/pq"
)

func ConnectDB() *sql.DB {
	connStr := "user=myuser dbname=mydb password=mypassword sslmode=disable host=localhost port=5490"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	return db
}
