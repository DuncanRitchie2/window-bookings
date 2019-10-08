create database window_bookings;
use window_bookings;

-- drop table customers;
create table customers(
	firstName varchar(100),
    lastName varchar(100),
    phoneNumber varchar(13),
    emailAddress varchar(255) unique,
    dateJoined datetime default current_timestamp,
    id int primary key auto_increment not null unique
);
insert into customers(firstName, lastName, phoneNumber, emailAddress) values
	("Duncan","Ritchie","4401244000000","duncanritchie@btinternet.com"),
	("Jo","Swinson","4401244000001","jswinson@duncanritchie.co.uk"),
	("Keir","Hardie","4401244000002","keir.hardie@duncanritchie.co.uk"),
	("Hillary","Clinton","0101244000003","hillary@duncanritchie.co.uk"),
	("Theresa","May","4401244000004","theresa-mary-may@duncanritchie.co.uk"),
	("David","Attenborough","4401244000005","attenborough@duncanritchie.co.uk"),
	("Jeremy","Corbyn","4401244000006","ooooohjeremycorbyn@duncanritchie.co.uk"),
	("Boris","Johnson","4401244000007","borisjohnson@duncanritchie.co.uk"),
	("Nicola","Sturgeon","4401244000008","sturgeon@duncanritchie.co.uk"),
	("Beyonce","Knowles","0101244000009","queenbey@duncanritchie.co.uk"),
	("Angela","Merkel","4901244000010","merkel@duncanritchie.co.uk")
;
-- select * from customers;

create table premises(
	houseNumber int,
    houseName varchar(100),
    street varchar(255),
    town varchar(100),
    country varchar(100),
    postCode varchar(10),
	id int primary key auto_increment not null unique
);
insert into premises(houseNumber, street, town, country, postCode) values
	(10,"Downing Street","London","UK","SW1A 2AA"),
	(1400,"Pennsylvania Avenue","Washington DC","US","DC 20004"),
    (1, "Platz der Republik", "Berlin", "Germany", "11011"),
	(2,"Random Place","Randomtown","UK","RD1 1AA");
insert into premises(houseName, street, town, country, postCode) values
	("Scottish Parliament","Holyrood Road","Edinburgh","UK","EH99 1SP")
;
-- select * from premises;

create table surveys(
	customer_id int,
    premises_id int,
    id int primary key auto_increment not null unique,
    dateToHappen datetime,
    dateBooked datetime default current_timestamp,
	FOREIGN KEY(customer_id) REFERENCES customers(id),
	FOREIGN KEY(premises_id) REFERENCES premises(id)
);
insert into surveys(customer_id, premises_id, dateToHappen) values
	(1, 4, "2019-11-08 12:00:00"),
	(7, 1, "2019-11-01 15:20:00"),
	(4, 2, "2019-10-10 17:15:00"),
	(11, 3, "2019-10-09 06:30:00")
;
select * from surveys;
select firstName, lastName, emailAddress, houseNumber, street, town, country, postCode from surveys join premises on surveys.premises_id = premises.id join customers on surveys.customer_id = customers.id;