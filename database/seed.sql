USE LTOIMS;

-- DATA




-- sample data for existing database schema "127_milestone3_schema.sql"

-- DRIVERS
INSERT INTO driver VALUES
('D000000000001','LIC000000001','Quezon City, Metro Manila','1995-06-15','Non-Professional','valid','Juan','Santos','Dela Cruz','Male','2027-06-15'),
('D000000000002','LIC000000002','Los Banos, Laguna','1988-03-22','Professional','valid','Maria','Reyes','Santos','Female','2026-03-22'),
('D000000000003','LIC000000003','Cebu City, Cebu','2002-11-10','Student Permit','valid','Carlos',NULL,'Garcia','Male','2025-11-10'),
('D000000000004','LIC000000004','Davao City, Davao del Sur','1975-01-05','Professional','suspended','Ana','Lopez','Torres','Female','2024-01-05'),
('D000000000005','LIC000000005','Baguio City, Benguet','1990-09-30','Non-Professional','expired','Mark','Diaz','Flores','Male','2023-09-30'),
('D000000000006','LIC000000006','Iloilo City, Iloilo','1985-02-18','Professional','valid','Jose','Cruz','Ramirez','Male','2027-02-18'),
('D000000000007','LIC000000007','Pasig City, Metro Manila','1998-12-01','Non-Professional','valid','Liza','Morales','Tan','Female','2026-12-01'),
('D000000000008','LIC000000008','Makati City, Metro Manila','1993-07-25','Professional','revoked','Paolo','Rivera','Gomez','Male','2024-07-25'),
('D000000000009','LIC000000009','Taguig City, Metro Manila','2000-04-14','Student Permit','valid','Ella','Santos','Lim','Female','2025-04-14'),
('D000000000010','LIC000000010','Cagayan de Oro, Misamis Oriental','1982-08-09','Professional','expired','Ramon','Uy','Chua','Male','2023-08-09');

-- VEHICLES
INSERT INTO vehicle VALUES
('CHASSIS000000001','ENGINE000000001','ABC1234','Red','2018-01-01','private car','Vios','Toyota','D000000000001'),
('CHASSIS000000002','ENGINE000000002','XYZ5678','Blue','2020-01-01','motorcycle','Click 125','Honda','D000000000001'),
('CHASSIS000000003','ENGINE000000003','JKL4321','White','2015-01-01','public utility vehicle','Jeepney','Isuzu','D000000000002'),
('CHASSIS000000004','ENGINE000000004','MNO8765','Black','2019-01-01','private car','Fortuner','Toyota','D000000000003'),
('CHASSIS000000005','ENGINE000000005','QRS1357','Green','2017-01-01','motorcycle','NMAX','Yamaha','D000000000004'),
('CHASSIS000000006','ENGINE000000006','TUV2468','Silver','2021-01-01','private car','Civic','Honda','D000000000006'),
('CHASSIS000000007','ENGINE000000007','WXY9753','Yellow','2016-01-01','public utility vehicle','UV Express','Toyota','D000000000007'),
('CHASSIS000000008','ENGINE000000008','AAA1111','Black','2022-01-01','motorcycle','Raider 150','Suzuki','D000000000008'),
('CHASSIS000000009','ENGINE000000009','BBB2222','White','2014-01-01','private car','Altis','Toyota','D000000000009'),
('CHASSIS000000010','ENGINE000000010','CCC3333','Blue','2013-01-01','public utility vehicle','Bus','Hyundai','D000000000010');

-- TRAFFIC VIOLATIONS
INSERT INTO traffic_violation VALUES
('V000000000001','overspeeding','2024-05-10','Quezon City, Metro Manila',1500,'Officer Reyes','unpaid','D000000000001','CHASSIS000000001'),
('V000000000002','reckless driving','2024-06-12','Los Banos, Laguna',2000,'Officer Cruz','paid','D000000000002','CHASSIS000000003'),
('V000000000003','illegal parking','2024-07-01','Cebu City, Cebu',500,NULL,'unpaid','D000000000003','CHASSIS000000004'),
('V000000000004','overspeeding','2023-12-20','Davao City, Davao del Sur',1500,'Officer Lim','contested','D000000000004','CHASSIS000000005'),
('V000000000005','reckless driving','2024-01-15','Baguio City, Benguet',2000,'Officer Tan','paid','D000000000005','CHASSIS000000002'),
('V000000000006','illegal parking','2024-03-10','Iloilo City, Iloilo',500,NULL,'unpaid','D000000000006','CHASSIS000000006'),
('V000000000007','overspeeding','2024-02-18','Pasig City, Metro Manila',1500,'Officer Cruz','paid','D000000000007','CHASSIS000000007'),
('V000000000008','reckless driving','2024-04-22','Makati City, Metro Manila',2000,'Officer Reyes','unpaid','D000000000008','CHASSIS000000008'),
('V000000000009','illegal parking','2024-06-30','Taguig City, Metro Manila',500,NULL,'contested','D000000000009','CHASSIS000000009'),
('V000000000010','overspeeding','2024-07-05','Cagayan de Oro, Misamis Oriental',1500,'Officer Lim','paid','D000000000010','CHASSIS000000010');

-- VEHICLE REGISTRATION
INSERT INTO vehicle_registration VALUES
('REG00001','2024-01-01','2025-01-01','active','CHASSIS000000001'),
('REG00002','2023-01-01','2024-01-01','expired','CHASSIS000000002'),
('REG00003','2024-03-15','2025-03-15','active','CHASSIS000000003'),
('REG00004','2022-06-01','2023-06-01','expired','CHASSIS000000004'),
('REG00005','2024-07-01','2025-07-01','active','CHASSIS000000005'),
('REG00006','2024-02-01','2025-02-01','active','CHASSIS000000006'),
('REG00007','2023-05-01','2024-05-01','expired','CHASSIS000000007'),
('REG00008','2024-08-01','2025-08-01','active','CHASSIS000000008'),
('REG00009','2022-09-01','2023-09-01','expired','CHASSIS000000009'),
('REG00010','2024-10-01','2025-10-01','active','CHASSIS000000010');
