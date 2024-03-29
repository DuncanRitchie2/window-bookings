-- --
-- -- 📚 INITIALISE DATABASE 📚
-- --

use heroku_0df52e197b8f6b5;


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
select * from customers;


-- --
-- -- 🕵️‍♀️ SURVEYORS 🕵️‍♂️
-- --

-- drop table surveyors;
create table surveyors(
	firstName varchar(100),
    lastName varchar(100),
    phoneNumber varchar(13),
    emailAddress varchar(255) unique,
    dateJoined datetime default current_timestamp,
    id int primary key auto_increment not null unique
);
insert into surveyors(firstName, lastName, phoneNumber, emailAddress) values
	("Beyonce","Knowles","0101244000001","queenbey@duncanritchie.co.uk"),
	("Sam","Smith","4401244000002","samsmith@duncanritchie.co.uk"),
	("Declan","McKenna","4401244000003","declan-mckenna@duncanritchie.co.uk"),
	("Camila","Cabello","0101244000004","camila.cabello@duncanritchie.co.uk")
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
select * from premises;


-- --
-- -- 📋 SURVEYS 📋
-- --

-- drop table surveys;
create table surveys(
	customer_id int,
    surveyor_id int,
    premises_id int,
    id int primary key auto_increment not null unique,
    dateToHappen datetime,
    dateBooked datetime default current_timestamp,
	foreign key (customer_id) references customers(id),
	foreign key (surveyor_id) references surveyors(id),
	foreign key (premises_id) references premises(id)
);
insert into surveys(customer_id, surveyor_id, premises_id, dateToHappen) values
	(41, 11, 1, "2019-11-08 12:00:00"),
	(61, 21, 1, "2019-11-01 15:20:00"),
	(31, 31, 11, "2019-10-10 17:15:00"),
	(101, 11, 21, "2019-10-09 06:30:00")
;
-- select * from surveys;
-- select customers.firstName, customers.lastName, customers.emailAddress, surveyors.firstName, surveyors.lastName, surveyors.emailAddress, houseName, houseNumber, street, town, country, postCode, dateToHappen from surveys join premises on surveys.premises_id = premises.id join customers on surveys.customer_id = customers.id join surveyors on surveys.surveyor_id = surveyors.id;


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
	(11, "Oval Office window"),
	(11, "West Wing window");
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
	(11, 1, "https://assets.publishing.service.gov.uk/government/assets/history/buildings/number-10-300-8ce94bd7c585b701c420d159f8c79f9b0a24b65860ef33fafcff92039c15870e.jpg"),
    (21, 21, "https://live.staticflickr.com/3538/3484815800_04033e5049_b.jpg")
;
-- select * from photos;


-- --
-- -- 📖 JOIN ALL TABLES! 📖
-- --

select url, dateTaken, dateToHappen, dateBooked, description, houseNumber, street, town, country, postCode, latitude, longitude, style, concat(customers.firstName, " ",customers.lastName) as "customer name", customers.phoneNumber, customers.emailAddress, customers.dateJoined, concat(surveyors.firstName, " ", surveyors.lastName) as "surveyor name", surveyors.phoneNumber, surveyors.emailAddress, surveyors.dateJoined
	from photos 
    join surveys on surveys.id = photos.survey_id 
    join windows on windows.id = photos.window_id 
    join premises on premises.id = windows.premises_id 
    join customers on customers.id = surveys.customer_id 
    join surveyors on surveyors.id = surveys.surveyor_id
    order by dateToHappen
    ;