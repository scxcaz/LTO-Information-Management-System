-- SCHEMA




CREATE SCHEMA LTOIMS;

USE LTOIMS;

CREATE TABLE driver(
	driverno CHAR(13) NOT NULL,
	licno CHAR(13) NOT NULL,
	address VARCHAR(100) NOT NULL,
	birthdate DATE NOT NULL,
	lictype	VARCHAR(20) NOT NULL,
	licstatus VARCHAR(20) NOT NULL,
	fname VARCHAR(30) NOT NULL,
	mname VARCHAR(30),
	lname VARCHAR(30) NOT NULL,
	sex VARCHAR(6) NOT NULL,
	licexpiration DATE NOT NULL,
	CONSTRAINT driver_driverno_pk PRIMARY KEY (driverno),
	CONSTRAINT driver_licno_uk UNIQUE (licno)
);

CREATE TABLE vehicle(
	chassisno CHAR(17) NOT NULL,
	engineno CHAR(20) NOT NULL,
	plateno CHAR(8)	NOT NULL,
	color VARCHAR(20) NOT NULL,
	myear DATE NOT NULL,
	vehicletype VARCHAR(30) NOT NULL,
	model VARCHAR(30) NOT NULL,
	make VARCHAR(30) NOT NULL,
	driverno CHAR(13) NOT NULL,
	CONSTRAINT vehicle_chassisno_pk PRIMARY KEY (chassisno),
	CONSTRAINT vehicle_engineno_uk UNIQUE (engineno),
	CONSTRAINT vehicle_plateno_uk UNIQUE (plateno),
	CONSTRAINT vehicle_driverno_fk FOREIGN KEY (driverno) REFERENCES driver(driverno)
);

CREATE TABLE traffic_violation(
	violationno CHAR(13) NOT NULL,
	violationtype VARCHAR(30) NOT NULL,
	violationdate DATE NOT NULL,
	violationloc VARCHAR(100) NOT NULL,
	fineamount DOUBLE NOT NULL,
	appofficer VARCHAR(100),
	violationstatus VARCHAR(20) NOT NULL,
	driverno CHAR(13) NOT NULL,
	chassisno CHAR(17) NOT NULL,
	CONSTRAINT traffic_violation_violationno_pk PRIMARY KEY (violationno),
	CONSTRAINT traffic_violation_driverno_fk FOREIGN KEY (driverno) REFERENCES driver(driverno),
	CONSTRAINT traffic_violation_chassisno_fk FOREIGN KEY (chassisno) REFERENCES vehicle(chassisno)
);

CREATE TABLE vehicle_registration(
	registrationno CHAR(8) NOT NULL,
	registrationdate DATE NOT NULL,
	expirationdate DATE NOT NULL,
	registrationstatus VARCHAR(20) NOT NULL,
	chassisno CHAR(17) NOT NULL,
	CONSTRAINT vehicle_registration_registrationno_pk PRIMARY KEY (registrationno),
	CONSTRAINT vehicle_registration_chassisno_fk FOREIGN KEY (chassisno) REFERENCES vehicle(chassisno)
);
