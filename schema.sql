-- --
-- -- 📚 INITIALISE DATABASE 📚
-- --

drop database window_bookings;
create database window_bookings;
use window_bookings;


-- --
-- -- 🙋‍♀️ CUSTOMERS 🙋‍♂️
-- --

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
	("Jacinda","Ardern","6401244000001","jacinda-ardern@labour.org.nz"),
	("Jo","Swinson","4401244000002","jswinson@libdems.org.uk"),
	("Keir","Hardie","4401244000003","keir.hardie@ihelpedfoundthelabourparty.co.uk"),
	("Hillary","Clinton","0101244000004","hillary@whitehouse.gov"),
	("Theresa","May","4401244000005","theresa-mary-may@fieldsofwheat.gov.uk"),
	("Caroline","Lucas","4401244000006","caroline-lucas@greenparty.org.uk"),
	("Jeremy","Corbyn","4401244000007","ooooohjeremycorbyn@labour.org.uk"),
	("Boris","Johnson","4401244000008","borisjohnson@downingstreet.gov.uk"),
	("Nicola","Sturgeon","4401244000009","sturgeon@parliament.scot"),
	("Leo","Varadkar","3531244000010","leo.varadkar@taoiseach.ie"),
	("Angela","Merkel","4901244000011","merkel@bundestag.de")
;
-- select * from customers;


-- --
-- -- 🕵️‍♀️ SURVEYORS 🕵️‍♂️
-- --

-- drop table surveyors;
create table surveyors(
	firstName varchar(100),
    lastName varchar(100),
    phoneNumber varchar(13),
    emailAddress varchar(255) unique,
    lastLatitude float,
    lastLongitude float,
    dateJoined datetime default current_timestamp,
    id int primary key auto_increment not null unique
);
insert into surveyors(firstName, lastName, phoneNumber, emailAddress, lastLatitude, lastLongitude) values
	("Beyoncé","Knowles","0101244000001","queenbey@duncanritchie.co.uk", 34.0833, -118.4478),
	("Sam","Smith","4401244000002","samsmith@duncanritchie.co.uk", 51.4730, -0.3050),
	("Declan","McKenna","4401244000003","declan-mckenna@duncanritchie.co.uk", 12.8163, 45.0025),
	("Camila","Cabello","0101244000004","camila.cabello@duncanritchie.co.uk", 23.1508, -82.3560),
	("George","Ezra","4401244000005","ezra@duncanritchie.co.uk", 47.4908, 19.0490),
    ("Owl","City","0101244000006","fireflies@duncanritchie.co.uk", -18, 179),
	("Ed","Sheeran","4401244000007","edsheeran@duncanritchie.co.uk",53.2698,-9.0534)
;
-- select * from surveyors;


-- --
-- -- 🏠 PREMISES 🏠
-- --

-- drop table premises;
create table premises(
	houseNumber int,
    houseName varchar(100),
    street varchar(255),
    town varchar(100),
    country varchar(100),
    postCode varchar(10),
    latitude float,
    longitude float,
    style varchar(255),
	id int primary key auto_increment not null unique
);
insert into premises(houseNumber, street, town, country, postCode, latitude, longitude, style) values
	(10, "Downing Street", "London", "UK", "SW1A 2AA", 51.5033, -0.1275, "Georgian"),
	(1400, "Pennsylvania Avenue", "Washington DC", "US", "DC 20004", 38.8977, -77.0365, "Neo-classical"),
    (1, "Platz der Republik", "Berlin", "Germany", "11011", 52.5186, 13.3761, "Neo-baroque")
;
insert into premises(houseName, street, town, country, postCode, latitude, longitude, style) values
	("Scottish Parliament", "Holyrood Road", "Edinburgh", "UK", "EH99 1SP", 55.9519, -3.1751, "Post-modern"),
    ("Senedd", "Pierhead Street", "Cardiff", "UK", "CF99 1NA", 51.4639, -3.1621, "Late modern")
;
-- insert into premises(houseNumber, street, town, country, postCode, latitude, longitude, style) values
-- 	(2, "Leodis Way", "Leeds", "UK", "LS99 2BD", 53.7318, -0.4144, "Warehouse"),
-- 	(3, "Burcott Garth", "Hull", "UK", "HU4 7LG", 53.7657, -1.5005, "Terrace"),
--     (8, "Holly Tree Walk", "Tadcaster", "UK", "LS24 9HT", 53.8755, -1.2762, "Terrace"),
--     (3, "Tamar Close", "Bere Alston", "UK", "PL20 7HF", 50.4789, -4.1924, "Semi-detached")
-- ;
-- select * from premises;


-- --
-- -- 📋 SURVEYS 📋
-- --

-- drop table surveys;
create table surveys(
	customer_id int,
    surveyor_id int,
    premises_id int,
    id int primary key auto_increment not null unique,
    status varchar(20),
    dateToHappen datetime,
    dateBooked datetime default current_timestamp,
	foreign key (customer_id) references customers(id),
	foreign key (surveyor_id) references surveyors(id),
	foreign key (premises_id) references premises(id)
);
insert into surveys(customer_id, surveyor_id, premises_id, status, dateToHappen) values
	(5, 2, 1, "complete", "2019-09-16 14:30:00"),
	(7, 3, 1, "complete", "2019-10-01 06:30:00"),
	(9, 3, 4, "happening", "2019-10-10 09:00:00"),
	(4, 4, 2, "surveyor en route", "2019-10-10 16:30:00"),
	(11, 2, 3, "pending", "2019-10-14 11:30:00"),
	(4, 5, 2, "pending", "2019-10-24 17:00:00")
;
-- select * from surveys;
-- select status, dateToHappen, customers.firstName, customers.lastName, customers.emailAddress, surveyors.firstName, surveyors.lastName, surveyors.emailAddress, houseName, houseNumber, street, town, country, postCode from surveys join premises on surveys.premises_id = premises.id join customers on surveys.customer_id = customers.id join surveyors on surveys.surveyor_id = surveyors.id order by dateToHappen;


-- --
-- -- 🔎 WINDOWS 🔍
-- --

-- drop table windows;
create table windows(
	premises_id int,
    description varchar(255),
    id int primary key auto_increment not null unique,
    foreign key(premises_id) references premises(id)
);
insert into windows(premises_id, description) values
	(1, "Window above front door"),
	(1, "Side window"),
	(2, "Oval Office window"),
	(2, "West Wing window");
-- select * from windows;


-- --
-- -- 📷 PHOTOS 📷
-- --

-- drop table photos;
create table photos(
    id int primary key auto_increment not null unique,
	survey_id int,
    window_id int,
    url varchar(255),
    dateTaken datetime default current_timestamp,
    foreign key(survey_id) references surveys(id),
    foreign key(window_id) references windows(id)
);
insert into photos(survey_id, window_id, url) values
	(1, 1, "https://assets.publishing.service.gov.uk/government/assets/history/buildings/number-10-300-8ce94bd7c585b701c420d159f8c79f9b0a24b65860ef33fafcff92039c15870e.jpg"),
    (3, 3, "https://live.staticflickr.com/3538/3484815800_04033e5049_b.jpg")
;
-- select * from photos;


-- --
-- -- 📖 JOIN ALL TABLES! 📖
-- --

select * from photos join surveys on surveys.id = photos.survey_id join windows on windows.id = photos.window_id join premises on premises.id = windows.premises_id join customers on customers.id = surveys.customer_id join surveyors on surveyors.id = surveys.surveyor_id;

SELECT surveys.id, customer_id, customers.firstName, customers.lastName, premises_id, houseNumber, street, town, country, postCode, latitude, longitude, dateToHappen FROM surveys JOIN premises ON premises.id=surveys.premises_id JOIN customers ON customers.id = surveys.customer_id WHERE surveyor_id=4;