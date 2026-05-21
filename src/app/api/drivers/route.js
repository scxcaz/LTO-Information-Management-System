import pool from "@/lib/db";

// handles retrieving driver records
export async function GET() {
  let conn;

  try {
    conn = await pool.getConnection();

    const rows = await conn.query(`
      SELECT
        driverno,
        licno,
        fname,
        mname,
        lname,
        sex,
        birthdate,
        address,
        lictype,
        licstatus,
        licexpiration
      FROM driver
      ORDER BY driverno
    `);

    return Response.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to fetch drivers.",
        error: error.message,
      },
      { status: 500 }
    );
  } finally {
    if (conn) conn.release();
  }
}


// handles adding a new driver record
export async function POST(request) {
  let conn;

  try {
    conn = await pool.getConnection();
    const body = await request.json();

    const {
      driverno,
      licno,
      fname,
      mname,
      lname,
      sex,
      birthdate,
      address,
      lictype,
      licstatus,
      licexpiration,
    } = body;

    // validators
    if (!driverno || String(driverno).trim() === "") {
      return Response.json({ success: false, message: "Driver Number is required." }, { status: 400 });
    }
    if (!licno || String(licno).trim() === "") {
      return Response.json({ success: false, message: "License Number is required." }, { status: 400 });
    }
    if (!fname || String(fname).trim() === "") {
      return Response.json({ success: false, message: "First Name is required." }, { status: 400 });
    }
    if (!lname || String(lname).trim() === "") {
      return Response.json({ success: false, message: "Last Name is required." }, { status: 400 });
    }
    if (!sex || !["M", "F"].includes(String(sex).toUpperCase().trim())) {
      return Response.json({ success: false, message: "Sex must be 'M' or 'F'." }, { status: 400 });
    }
    if (!birthdate || isNaN(Date.parse(birthdate))) {
      return Response.json({ success: false, message: "Birthdate must be a valid date." }, { status: 400 });
    }
    if (!lictype || !["Professional", "Non-Professional"].includes(String(lictype).trim())) {
      return Response.json({ success: false, message: "License Type must be Professional or Non-Professional." }, { status: 400 });
    }
    if (!licstatus || !["Active", "Expired", "Suspended", "Revoked"].includes(String(licstatus).trim())) {
      return Response.json({ success: false, message: "Invalid License Status." }, { status: 400 });
    }
    if (!licexpiration || isNaN(Date.parse(licexpiration))) {
      return Response.json({ success: false, message: "License Expiration must be a valid date." }, { status: 400 });
    }

    // Check for duplicate driverno
    const [existingDriverNo] = await conn.query("SELECT driverno FROM driver WHERE driverno = ?", [String(driverno).trim()]);
    if (existingDriverNo && existingDriverNo.length > 0) {
      return Response.json({ success: false, message: `Driver Number '${driverno}' already exists.` }, { status: 400 });
    }

    // Check for duplicate licno
    const [existingLicNo] = await conn.query("SELECT licno FROM driver WHERE licno = ?", [String(licno).trim()]);
    if (existingLicNo && existingLicNo.length > 0) {
      return Response.json({ success: false, message: `License Number '${licno}' is already assigned to another driver.` }, { status: 400 });
    }

    await conn.query(
      `INSERT INTO driver (driverno, licno, fname, mname, lname, sex, birthdate, address, lictype, licstatus, licexpiration)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        String(driverno).trim(),
        String(licno).trim(),
        String(fname).trim(),
        mname ? String(mname).trim() : null,
        String(lname).trim(),
        String(sex).toUpperCase().trim(),
        birthdate,
        address ? String(address).trim() : null,
        String(lictype).trim(),
        String(licstatus).trim(),
        licexpiration
      ]
    );

    return Response.json({ success: true, message: "Driver added successfully." });
  } catch (error) {
    return Response.json(
      { success: false, message: "Failed to add driver.", error: error.message },
      { status: 500 }
    );
  } finally {
    if (conn) conn.release();
  }
}

// handles updating an existing driver record
export async function PUT(request) {
  let conn;

  try {
    conn = await pool.getConnection();
    const body = await request.json();

    const {
      driverno,
      licno,
      fname,
      mname,
      lname,
      sex,
      birthdate,
      address,
      lictype,
      licstatus,
      licexpiration,
    } = body;

    // validators
    if (!licno || String(licno).trim() === "") {
      return Response.json({ success: false, message: "License Number is required." }, { status: 400 });
    }
    if (!fname || String(fname).trim() === "") {
      return Response.json({ success: false, message: "First Name is required." }, { status: 400 });
    }
    if (!lname || String(lname).trim() === "") {
      return Response.json({ success: false, message: "Last Name is required." }, { status: 400 });
    }
    if (!sex || !["M", "F"].includes(String(sex).toUpperCase().trim())) {
      return Response.json({ success: false, message: "Sex must be 'M' or 'F'." }, { status: 400 });
    }
    if (!birthdate || isNaN(Date.parse(birthdate))) {
      return Response.json({ success: false, message: "Birthdate must be a valid date." }, { status: 400 });
    }
    if (!lictype || !["Professional", "Non-Professional"].includes(String(lictype).trim())) {
      return Response.json({ success: false, message: "License Type must be Professional or Non-Professional." }, { status: 400 });
    }
    if (!licstatus || !["Active", "Expired", "Suspended", "Revoked"].includes(String(licstatus).trim())) {
      return Response.json({ success: false, message: "Invalid License Status." }, { status: 400 });
    }
    if (!licexpiration || isNaN(Date.parse(licexpiration))) {
      return Response.json({ success: false, message: "License Expiration must be a valid date." }, { status: 400 });
    }

    // Check if licno is already taken by another driver
    const [existingLicNo] = await conn.query("SELECT driverno FROM driver WHERE licno = ? AND driverno != ?", [String(licno).trim(), String(driverno).trim()]);
    if (existingLicNo && existingLicNo.length > 0) {
      return Response.json({ success: false, message: `License Number '${licno}' is already assigned to another driver.` }, { status: 400 });
    }

    await conn.query(
      `UPDATE driver SET licno=?, fname=?, mname=?, lname=?, sex=?, birthdate=?, address=?, lictype=?, licstatus=?, licexpiration=?
       WHERE driverno=?`,
      [
        String(licno).trim(),
        String(fname).trim(),
        mname ? String(mname).trim() : null,
        String(lname).trim(),
        String(sex).toUpperCase().trim(),
        birthdate,
        address ? String(address).trim() : null,
        String(lictype).trim(),
        String(licstatus).trim(),
        licexpiration,
        String(driverno).trim()
      ]
    );

    return Response.json({ success: true, message: "Driver updated successfully." });
  } catch (error) {
    return Response.json(
      { success: false, message: "Failed to update driver.", error: error.message },
      { status: 500 }
    );
  } finally {
    if (conn) conn.release();
  }
}

// handles deleting a driver record
export async function DELETE(request) {
  let conn;

  try {
    conn = await pool.getConnection();
    const body = await request.json();
    const { driverno } = body;

    if (!driverno) {
      return Response.json({ success: false, message: "Driver Number is required for deletion." }, { status: 400 });
    }

    await conn.query(`DELETE FROM driver WHERE driverno=?`, [driverno]);

    return Response.json({ success: true, message: "Driver deleted successfully." });
  } catch (error) {
    const isForeignKey = error.message.includes("foreign key constraint");
    return Response.json(
      {
        success: false,
        message: isForeignKey
          ? "Cannot delete this driver because they have linked vehicles, registrations, or violations."
          : "Failed to delete driver.",
        error: error.message,
      },
      { status: 500 }
    );
  } finally {
    if (conn) conn.release();
  }
}