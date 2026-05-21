from datetime import date, timedelta
import random

random.seed(127)

first_names = [
    "Juan", "Maria", "Carlos", "Ana", "Mark", "Jose", "Liza", "Paolo", "Ella", "Ramon",
    "Miguel", "Sofia", "Gabriel", "Isabel", "Andrei", "Camille", "Luis", "Bianca", "Rafael", "Jasmine",
    "Nathan", "Patricia", "Daniel", "Alyssa", "Marco", "Therese", "Enzo", "Mikaela", "Kevin", "Angela",
    "Francis", "Nicole", "Adrian", "Bea", "Joshua", "Katrina", "Christian", "Mira", "Vincent", "Leah",
    "Jerome", "Clarisse", "Patrick", "Dianne", "Aaron", "Trisha", "Ken", "Elaine", "Cedric", "Monica"
]

middle_names = [
    "Santos", "Reyes", "Cruz", "Lopez", "Diaz", "Morales", "Rivera", "Garcia", "Torres", "Flores",
    "Navarro", "Castro", "Ramos", "Mendoza", "Aquino", "Villanueva", "Salazar", "Bautista", "Fernandez", "Mercado"
]

last_names = [
    "Dela Cruz", "Santos", "Garcia", "Torres", "Flores", "Ramirez", "Tan", "Gomez", "Lim", "Chua",
    "Reyes", "Mendoza", "Castillo", "Perez", "Cruz", "Navarro", "Aquino", "Lopez", "Ramos", "Villanueva",
    "Bautista", "Salazar", "Fernandez", "Mercado", "Morales"
]

locations = [
    "Quezon City, Metro Manila", "Los Banos, Laguna", "Cebu City, Cebu", "Davao City, Davao del Sur",
    "Baguio City, Benguet", "Iloilo City, Iloilo", "Pasig City, Metro Manila", "Makati City, Metro Manila",
    "Taguig City, Metro Manila", "Cagayan de Oro, Misamis Oriental", "Calamba City, Laguna",
    "San Pablo City, Laguna", "Santa Rosa City, Laguna", "Batangas City, Batangas", "Lipa City, Batangas",
    "Naga City, Camarines Sur", "Bacolod City, Negros Occidental", "General Santos City, South Cotabato",
    "Zamboanga City, Zamboanga del Sur", "Marikina City, Metro Manila"
]

vehicle_catalog = [
    ("private car", "Toyota", "Vios"),
    ("private car", "Toyota", "Altis"),
    ("private car", "Toyota", "Fortuner"),
    ("private car", "Honda", "Civic"),
    ("private car", "Mitsubishi", "Mirage"),
    ("private car", "Nissan", "Almera"),
    ("private car", "Hyundai", "Accent"),
    ("motorcycle", "Honda", "Click 125"),
    ("motorcycle", "Yamaha", "NMAX"),
    ("motorcycle", "Suzuki", "Raider 150"),
    ("motorcycle", "Kawasaki", "Barako"),
    ("public utility vehicle", "Isuzu", "Jeepney"),
    ("public utility vehicle", "Toyota", "UV Express"),
    ("public utility vehicle", "Hyundai", "Bus"),
    ("public utility vehicle", "Mitsubishi", "L300")
]

colors = ["Red", "Blue", "White", "Black", "Green", "Silver", "Yellow", "Gray", "Orange", "Brown"]

violation_types = [
    ("overspeeding", 1500),
    ("reckless driving", 2000),
    ("illegal parking", 500),
    ("driving without seatbelt", 1000),
    ("beating the red light", 1500),
    ("obstruction", 1000),
    ("expired registration", 2000)
]

officers = [
    "Officer Reyes", "Officer Cruz", "Officer Lim", "Officer Tan", "Officer Santos",
    "Officer Garcia", "Officer Mendoza", "Officer Torres", "Officer Ramos", "Officer Flores"
]

def sql(value):
    if value is None:
        return "NULL"
    return "'" + str(value).replace("'", "''") + "'"

def driver_no(i):
    return f"D{i:012d}"

def license_no(i):
    return f"N{i % 99:02d}-24-{i:06d}"

def violation_no(i):
    return f"V{i:012d}"

def registration_no(i):
    return f"REG{i:05d}"

def chassis_no(i):
    return f"PHLTO{i:012d}"[:17]

def engine_no(i):
    return f"ENGPH{i:015d}"[:20]

def plate_no(i):
    letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    a = letters[(i // 676) % 26]
    b = letters[(i // 26) % 26]
    c = letters[i % 26]
    return f"{a}{b}{c}{1000 + i}"

drivers = []
vehicles = []
registrations = []
violations = []

for i in range(1, 51):
    sex = "Male" if first_names[i - 1] in {
    "Juan", "Carlos", "Mark", "Jose", "Paolo", "Ramon", "Miguel", "Gabriel",
    "Andrei", "Luis", "Rafael", "Nathan", "Daniel", "Marco", "Enzo", "Kevin",
    "Francis", "Adrian", "Joshua", "Christian", "Vincent", "Jerome",
    "Patrick", "Aaron", "Ken", "Cedric"
    } else "Female"
    lictype = ["Student Permit", "Non-Professional", "Professional"][i % 3]
    licstatus = ["valid", "valid", "valid", "expired", "suspended", "revoked"][i % 6]

    birth_year = random.randint(1968, 2005)
    birth_month = random.randint(1, 12)
    birth_day = random.randint(1, 28)
    birthdate = date(birth_year, birth_month, birth_day)

    if licstatus == "expired":
        licexpiration = date(random.randint(2022, 2024), random.randint(1, 12), random.randint(1, 28))
    else:
        licexpiration = date(random.randint(2025, 2028), random.randint(1, 12), random.randint(1, 28))

    drivers.append((
        driver_no(i),
        license_no(i),
        locations[(i - 1) % len(locations)],
        birthdate.isoformat(),
        lictype,
        licstatus,
        first_names[i - 1],
        middle_names[(i - 1) % len(middle_names)] if i % 7 != 0 else None,
        last_names[(i - 1) % len(last_names)],
        sex,
        licexpiration.isoformat()
    ))

for i in range(1, 51):
    vehicletype, make, model = vehicle_catalog[(i - 1) % len(vehicle_catalog)]
    model_year = date(random.randint(2012, 2024), 1, 1)

    vehicles.append((
        chassis_no(i),
        engine_no(i),
        plate_no(i),
        colors[(i - 1) % len(colors)],
        model_year.isoformat(),
        vehicletype,
        model,
        make,
        driver_no(((i - 1) % 50) + 1)
    ))

for i in range(1, 51):
    registration_date = date(random.randint(2021, 2025), random.randint(1, 12), random.randint(1, 28))
    expiration_date = registration_date.replace(year=registration_date.year + 1)
    registrationstatus = "expired" if expiration_date < date(2025, 1, 1) else "active"

    registrations.append((
        registration_no(i),
        registration_date.isoformat(),
        expiration_date.isoformat(),
        registrationstatus,
        chassis_no(i)
    ))

for i in range(1, 51):
    vehicle_index = ((i - 1) % 50) + 1
    violationtype, fineamount = violation_types[(i - 1) % len(violation_types)]
    violationdate = date(random.randint(2023, 2025), random.randint(1, 12), random.randint(1, 28))
    violationstatus = ["paid", "unpaid", "contested"][i % 3]

    violations.append((
        violation_no(i),
        violationtype,
        violationdate.isoformat(),
        locations[(i + 3) % len(locations)],
        fineamount,
        officers[(i - 1) % len(officers)] if violationtype != "illegal parking" else None,
        violationstatus,
        driver_no(vehicle_index),
        chassis_no(vehicle_index)
    ))

def insert_block(table, rows):
    lines = [f"INSERT INTO {table} VALUES"]
    formatted_rows = []
    for row in rows:
        formatted = "(" + ",".join(sql(value) for value in row) + ")"
        formatted_rows.append(formatted)
    lines.append(",\n".join(formatted_rows) + ";")
    return "\n".join(lines)

content = f"""USE LTOIMS;

-- DATA

-- DRIVERS
{insert_block("driver", drivers)}

-- VEHICLES
{insert_block("vehicle", vehicles)}

-- TRAFFIC VIOLATIONS
{insert_block("traffic_violation", violations)}

-- VEHICLE REGISTRATION
{insert_block("vehicle_registration", registrations)}
"""

with open("database/seed.sql", "w", newline="\n") as file:
    file.write(content)
