CREATE TABLE UserAuth (
	userId VARCHAR(256) not null,
	passwordHash VARCHAR(256) not null, 
	accountName VARCHAR(256) not null,
	unique(accountName),
	PRIMARY KEY (userId)
);
