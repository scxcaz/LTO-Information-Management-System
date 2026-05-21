# CMSC 127 LTO Information Management System

## Project Overview

This project is a simplified **Land Transportation Office (LTO) Information Management System** for managing driver, vehicle, vehicle registration, and traffic violation records.

It allows LTO personnel to:

- View, add, edit, delete, and search driver records
- View, add, edit, delete, and search vehicle records
- View, add, edit, delete, and search vehicle registration records
- View, add, edit, delete, and search traffic violation records
- Generate required SQL-based reports from the MariaDB database

---

## Tech Stack

- **Frontend:** Next.js / React
- **Backend:** Next.js API Routes
- **Database:** MariaDB
- **Language:** JavaScript
- **Styling:** Tailwind CSS

---

## Project Structure

```txt
cmsc-127-st1-2l-casmamper-final-project/
+-- database/
�   +-- schema.sql                              # database schema and table definitions
�   +-- seed.sql                                # sample seed data
�   +-- reports.sql                             # standalone report query references
�   +-- castillo_guarte_maminta_perez_PM3.sql   # archived combined SQL file
+-- src/
�   +-- app/
�   �   +-- api/                                # API routes
�   �   �   +-- drivers/
�   �   �   +-- vehicles/
�   �   �   +-- registrations/
�   �   �   +-- violations/
�   �   �   +-- reports/
�   �   +-- drivers/                            # driver records page
�   �   +-- vehicles/                           # vehicle records page
�   �   +-- registrations/                      # vehicle registration records page
�   �   +-- violations/                         # traffic violation records page
�   �   +-- reports/                            # reports page
�   +-- lib/
�       +-- db.js                               # MariaDB connection pool
+-- .env.example
+-- README.md
+-- package.json
```

---

## Features

### Driver Management

- View driver records
- Add new drivers
- Edit existing drivers
- Delete drivers when allowed by database constraints
- Search driver records
- Validate required driver fields

### Vehicle Management

- View vehicle records with owner details
- Add new vehicles
- Edit existing vehicles
- Delete vehicles when allowed by database constraints
- Search vehicle records
- Validate required vehicle fields

### Vehicle Registration Management

- View vehicle registration records
- Add new registration records
- Edit existing registration records
- Delete registration records
- Search registration records

### Traffic Violation Management

- View traffic violation records
- Add new violation records
- Edit existing violation records
- Delete violation records
- Search violation records

### Reports

The system supports the required SQL-based reports:

1. Registered drivers filtered by license type, license status, sex, and age range
2. Vehicles owned by a given driver
3. Vehicles with expired registrations as of a given date
4. Drivers with expired or suspended licenses
5. Traffic violations committed by a given driver within a date range
6. Total number of violations per violation type for a given year
7. Vehicles involved in violations within a given city or region

---

## Local Setup

### 1. Install dependencies

```bash
npm install
```

---

### 2. Install and start MariaDB

Download and install MariaDB:

```txt
https://mariadb.org/download/
```

During installation:

- Set a root password
- Use the default port: `3306`

Make sure MariaDB is running before starting the app.

---

### 3. Set up the database

The current setup uses the separated database files:

```txt
database/schema.sql
database/seed.sql
database/reports.sql
```

The old combined SQL file is kept only as an archived reference:

```txt
database/castillo_guarte_maminta_perez_PM3.sql
```

Do not run the combined file together with the separated files to avoid duplicate setup.

#### PowerShell setup

Drop the existing database if needed:

```powershell
mariadb -u root -pYourPassword -e "DROP DATABASE IF EXISTS LTOIMS;"
```

Import the schema:

```powershell
Get-Content database/schema.sql | mariadb -u root -pYourPassword
```

Import the seed data:

```powershell
Get-Content database/seed.sql | mariadb -u root -pYourPassword
```

Verify the record counts:

```powershell
mariadb -u root -pYourPassword -e "USE LTOIMS; SELECT 'driver' AS table_name, COUNT(*) AS total FROM driver UNION ALL SELECT 'vehicle', COUNT(*) FROM vehicle UNION ALL SELECT 'vehicle_registration', COUNT(*) FROM vehicle_registration UNION ALL SELECT 'traffic_violation', COUNT(*) FROM traffic_violation;"
```

Expected result:

```txt
driver                50
vehicle               50
vehicle_registration  50
traffic_violation     50
```

---

### 4. Create the environment file

Copy `.env.example` into `.env.local`:

```bash
cp .env.example .env.local
```

For Windows PowerShell, you can use:

```powershell
Copy-Item .env.example .env.local
```

Then update `.env.local` with your local MariaDB credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mariadb_password
DB_NAME=LTOIMS
```

---

### 5. Run the project

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

Main pages:

```txt
http://localhost:3000/drivers
http://localhost:3000/vehicles
http://localhost:3000/registrations
http://localhost:3000/violations
http://localhost:3000/reports
```

---

## Demo Preparation

Before presenting, prepare a clean local database:

```powershell
mariadb -u root -pYourPassword -e "DROP DATABASE IF EXISTS LTOIMS;"
Get-Content database/schema.sql | mariadb -u root -pYourPassword
Get-Content database/seed.sql | mariadb -u root -pYourPassword
npm run dev
```

Then test these pages:

```txt
/drivers
/vehicles
/registrations
/violations
/reports
```

---

## Important Notes

- Do not commit `.env.local`
- Each developer should use their own MariaDB password
- `schema.sql` and `seed.sql` are the official setup files
- `reports.sql` is for report query reference/testing
- `castillo_guarte_maminta_perez_PM3.sql` is archived for reference only

---

## Team Members

- Castillo, Sean Carlo
- Maminta, Lawrence Andrew
- Perez, Desmond Rainier
