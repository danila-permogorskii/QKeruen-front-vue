package config

var (
	createDriverTable = `CREATE TABLE IF NOT EXISTS driver(
		id SERIAL PRIMARY KEY,
		phone varchar(50),
		firstName varchar(50),
		lastName varchar(50),
		ava varchar(200),
		carNumber varchar(200),
		carColor varchar(200),
		carModel varchar(200),
		docsfront varchar(200),
		docsback varchar(200),
		carType varchar(50),
		token varchar(500)
	);
	`
	createUserTable = `CREATE TABLE IF NOT EXISTS user(
		id SERIAL PRIMARY KEY,
		phone varchar(50),
		firstName varchar(50),
		lastName varchar(50),
		ava varchar(200),
		token varchar(500)
	);
	`
	createHistoryTable = `CREATE TABLE IF NOT EXISTS history(
		id SERIAL PRIMARY KEY,
		orderId varchar(100),
		driverId varchar(100),
		userId varchar(100),
		startDate varchar(100),
		finishedDate varchar(100)
	);
	`
	createOfferDriverTable = `CREATE TABLE IF NOT EXISTS offer_driver(
		id SERIAL PRIMARY KEY,
		comment varchar(500),
		locationFrom varchar(100),
		locationTo varchar(100),
		type varchar(100),
		driver varchar(100)
	);
	`
	createOfferUserTable = `CREATE TABLE IF NOT EXISTS offer_user(
		id SERIAL PRIMARY KEY,
		comment varchar(500),
		locationFrom varchar(100),
		locationTo varchar(100),
		type varchar(100),
		user varchar(100)
	);
	`
	createOrderProcessTable = `CREATE TABLE IF NOT EXISTS order_process(
		id SERIAL PRIMARY KEY,
		userId varchar(100),
		latitudeFrom varchar(100),
		longitudeFrom varchar(100),
		latitudeTo varchar(100),
		longitudeTo varchar(100),
		comments varchar(500),
		price INTEGER,
		type varchar(100)
	);
	`
	createTableSMS = `CREATE TABLE IF NOT EXISTS sms_cache(
		id SERIAL PRIMARY KEY,
		contact varchar(50),
		code INTEGER
	);
	`
)
