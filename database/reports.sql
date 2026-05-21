USE LTOIMS;

-- REPORTS




-- 1) View all registered drivers filtered by: License type, License status, Age range, Sex
SELECT
    d.driverno,
    CONCAT(d.fname, ' ', COALESCE(CONCAT(d.mname, ' '), ''), d.lname) AS full_name,
    d.birthdate,
    TIMESTAMPDIFF(YEAR, d.birthdate, CURDATE()) AS age,
    d.sex,
    d.address,
    d.licno,
    d.lictype,
    d.licstatus,
    d.licexpiration
FROM driver d
WHERE d.lictype = 'Professional'
  AND d.licstatus = 'valid'
  AND d.sex = 'Female'
  AND TIMESTAMPDIFF(YEAR, d.birthdate, CURDATE()) BETWEEN 18 AND 60
ORDER BY d.lname, d.fname;


-- 2) View all vehicles owned by a given driver (using driverno)
SELECT
    d.driverno,
    CONCAT(d.fname, ' ', COALESCE(CONCAT(d.mname, ' '), ''), d.lname) AS owner_name,
    v.chassisno,
    v.engineno,
    v.plateno,
    v.vehicletype,
    v.make,
    v.model,
    YEAR(v.myear) AS model_year,
    v.color
FROM driver d
JOIN vehicle v
    ON d.driverno = v.driverno
WHERE d.driverno = 'D000000000001'
ORDER BY v.plateno;


-- 3) View all vehicles with expired registrations as of a given date
SELECT
    v.plateno,
    v.chassisno,
    v.engineno,
    v.vehicletype,
    v.make,
    v.model,
    YEAR(v.myear) AS model_year,
    v.color,
    vr.registrationno,
    vr.registrationdate,
    vr.expirationdate,
    vr.registrationstatus,
    CONCAT(d.fname, ' ', COALESCE(CONCAT(d.mname, ' '), ''), d.lname) AS owner_name
FROM vehicle_registration vr
JOIN vehicle v
    ON vr.chassisno = v.chassisno
JOIN driver d
    ON v.driverno = d.driverno
WHERE vr.expirationdate < '2025-01-01'          -- sample date
ORDER BY vr.expirationdate ASC, v.plateno;


-- 4) View all drivers with expired or suspended licenses
SELECT
    d.driverno,
    CONCAT(d.fname, ' ', COALESCE(CONCAT(d.mname, ' '), ''), d.lname) AS full_name,
    d.licno,
    d.lictype,
    d.licstatus,
    d.licexpiration,
    d.address,
    d.sex,
    d.birthdate
FROM driver d
WHERE d.licstatus IN ('expired', 'suspended')
   OR d.licexpiration < CURDATE()
ORDER BY d.licstatus, d.licexpiration, d.lname, d.fname;


-- 5) View all traffic violations committed by a given driver within a specified date range (by driverno)
SELECT
    tv.violationno,
    tv.violationtype,
    tv.violationdate,
    tv.violationloc,
    tv.fineamount,
    tv.appofficer,
    tv.violationstatus,
    v.plateno,
    v.vehicletype,
    v.make,
    v.model,
    CONCAT(d.fname, ' ', COALESCE(CONCAT(d.mname, ' '), ''), d.lname) AS driver_name
FROM traffic_violation tv
JOIN driver d
    ON tv.driverno = d.driverno
JOIN vehicle v
    ON tv.chassisno = v.chassisno
WHERE d.driverno = 'D000000000001'
  AND tv.violationdate BETWEEN '2024-01-01' AND '2024-12-31'            -- sample date range
ORDER BY tv.violationdate, tv.violationno;


-- 6) View the total number of violations per violation type for a given year
SELECT
    YEAR(tv.violationdate) AS violation_year,
    tv.violationtype,
    COUNT(*) AS total_violations
FROM traffic_violation tv
WHERE YEAR(tv.violationdate) = 2024             -- example for year 2024
GROUP BY YEAR(tv.violationdate), tv.violationtype
ORDER BY total_violations DESC, tv.violationtype;


-- 7) View all vehicles involved in violations within a given city or region
SELECT DISTINCT
    v.plateno,
    v.chassisno,
    v.engineno,
    v.vehicletype,
    v.make,
    v.model,
    YEAR(v.myear) AS model_year,
    v.color,
    CONCAT(d.fname, ' ', COALESCE(CONCAT(d.mname, ' '), ''), d.lname) AS owner_name,
    tv.violationloc
FROM traffic_violation tv
JOIN vehicle v
    ON tv.chassisno = v.chassisno
JOIN driver d
    ON v.driverno = d.driverno
WHERE tv.violationloc LIKE '%Metro Manila%'             -- sample city/region
ORDER BY v.plateno;
