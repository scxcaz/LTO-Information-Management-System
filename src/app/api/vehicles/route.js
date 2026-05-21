import pool from "@/lib/db";

// handles retrieving vehicle records with owner details
export async function GET() {
  let conn;

  try {
    conn = await pool.getConnection();

    const rows = await conn.query(`
      SELECT
        v.chassisno,
        v.engineno,
        v.plateno,
        v.color,
        v.myear,
        v.vehicletype,
        v.model,
        v.make,
        v.driverno,
        d.licno,
        d.fname,
        d.mname,
        d.lname
      FROM vehicle v
      JOIN driver d ON v.driverno = d.driverno
      ORDER BY v.plateno
    `);

    return Response.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to fetch vehicles.",
        error: error.message,
      },
      { status: 500 }
    );
  } finally {
    if (conn) conn.release();
  }
}


// handles adding a new vehicle record
export async function POST(request) {
  let conn;

  try {
    conn = await pool.getConnection();
    const body = await request.json();

    const {
      chassisno,
      engineno,
      plateno,
      color,
      myear,
      vehicletype,
      model,
      make,
      driverno,
    } = body;

    if (!chassisno || String(chassisno).trim() === "") {
      return Response.json({ success: false, message: "Chassis Number is required." }, { status: 400 });
    }
    if (!engineno || String(engineno).trim() === "") {
      return Response.json({ success: false, message: "Engine Number is required." }, { status: 400 });
    }
    if (!plateno || String(plateno).trim() === "") {
      return Response.json({ success: false, message: "Plate Number is required." }, { status: 400 });
    }
    if (!myear || isNaN(parseInt(myear))) {
      return Response.json({ success: false, message: "Model Year must be a valid number." }, { status: 400 });
    }
    if (!vehicletype || String(vehicletype).trim() === "") {
      return Response.json({ success: false, message: "Vehicle Type is required." }, { status: 400 });
    }
    if (!driverno || String(driverno).trim() === "") {
      return Response.json({ success: false, message: "Driver Number is required." }, { status: 400 });
    }

    const [driverRows] = await conn.query("SELECT driverno FROM driver WHERE driverno = ?", [String(driverno).trim()]);
    if (!driverRows || driverRows.length === 0) {
      return Response.json({ success: false, message: `Driver Number '${driverno}' does not exist.` }, { status: 400 });
    }

    const [existingChassis] = await conn.query("SELECT chassisno FROM vehicle WHERE chassisno = ?", [String(chassisno).trim()]);
    if (existingChassis && existingChassis.length > 0) {
      return Response.json({ success: false, message: `Chassis Number '${chassisno}' already exists.` }, { status: 400 });
    }

    const [existingEngine] = await conn.query("SELECT engineno FROM vehicle WHERE engineno = ?", [String(engineno).trim()]);
    if (existingEngine && existingEngine.length > 0) {
      return Response.json({ success: false, message: `Engine Number '${engineno}' already exists.` }, { status: 400 });
    }

    const [existingPlate] = await conn.query("SELECT plateno FROM vehicle WHERE plateno = ?", [String(plateno).trim()]);
    if (existingPlate && existingPlate.length > 0) {
      return Response.json({ success: false, message: `Plate Number '${plateno}' already exists.` }, { status: 400 });
    }

    await conn.query(
      `INSERT INTO vehicle (chassisno, engineno, plateno, color, myear, vehicletype, model, make, driverno)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        String(chassisno).trim(),
        String(engineno).trim(),
        String(plateno).trim(),
        color ? String(color).trim() : null,
        parseInt(myear),
        String(vehicletype).trim(),
        model ? String(model).trim() : null,
        make ? String(make).trim() : null,
        String(driverno).trim()
      ]
    );

    return Response.json({ success: true, message: "Vehicle added successfully." });
  } catch (error) {
    return Response.json(
      { success: false, message: "Failed to add vehicle.", error: error.message },
      { status: 500 }
    );
  } finally {
    if (conn) conn.release();
  }
}


// handles updating an existing vehicle record
export async function PUT(request) {
  let conn;

  try {
    conn = await pool.getConnection();
    const body = await request.json();

    const {
      chassisno,
      engineno,
      plateno,
      color,
      myear,
      vehicletype,
      model,
      make,
      driverno,
    } = body;

    if (!engineno || String(engineno).trim() === "") {
      return Response.json({ success: false, message: "Engine Number is required." }, { status: 400 });
    }
    if (!plateno || String(plateno).trim() === "") {
      return Response.json({ success: false, message: "Plate Number is required." }, { status: 400 });
    }
    if (!myear || isNaN(parseInt(myear))) {
      return Response.json({ success: false, message: "Model Year must be a valid number." }, { status: 400 });
    }
    if (!vehicletype || String(vehicletype).trim() === "") {
      return Response.json({ success: false, message: "Vehicle Type is required." }, { status: 400 });
    }
    if (!driverno || String(driverno).trim() === "") {
      return Response.json({ success: false, message: "Driver Number is required." }, { status: 400 });
    }

    const [driverRows] = await conn.query("SELECT driverno FROM driver WHERE driverno = ?", [String(driverno).trim()]);
    if (!driverRows || driverRows.length === 0) {
      return Response.json({ success: false, message: `Driver Number '${driverno}' does not exist.` }, { status: 400 });
    }

    const [existingEngine] = await conn.query("SELECT chassisno FROM vehicle WHERE engineno = ? AND chassisno != ?", [String(engineno).trim(), String(chassisno).trim()]);
    if (existingEngine && existingEngine.length > 0) {
      return Response.json({ success: false, message: `Engine Number '${engineno}' is already assigned to another vehicle.` }, { status: 400 });
    }

    const [existingPlate] = await conn.query("SELECT chassisno FROM vehicle WHERE plateno = ? AND chassisno != ?", [String(plateno).trim(), String(chassisno).trim()]);
    if (existingPlate && existingPlate.length > 0) {
      return Response.json({ success: false, message: `Plate Number '${plateno}' is already assigned to another vehicle.` }, { status: 400 });
    }

    await conn.query(
      `UPDATE vehicle SET engineno=?, plateno=?, color=?, myear=?, vehicletype=?, model=?, make=?, driverno=?
       WHERE chassisno=?`,
      [
        String(engineno).trim(),
        String(plateno).trim(),
        color ? String(color).trim() : null,
        parseInt(myear),
        String(vehicletype).trim(),
        model ? String(model).trim() : null,
        make ? String(make).trim() : null,
        String(driverno).trim(),
        String(chassisno).trim()
      ]
    );

    return Response.json({ success: true, message: "Vehicle updated successfully." });
  } catch (error) {
    return Response.json(
      { success: false, message: "Failed to update vehicle.", error: error.message },
      { status: 500 }
    );
  } finally {
    if (conn) conn.release();
  }
}


// handles deleting a vehicle record
export async function DELETE(request) {
  let conn;

  try {
    conn = await pool.getConnection();
    const body = await request.json();
    const { chassisno } = body;

    if (!chassisno) {
      return Response.json({ success: false, message: "Chassis Number is required for deletion." }, { status: 400 });
    }

    await conn.query(`DELETE FROM vehicle WHERE chassisno=?`, [chassisno]);

    return Response.json({ success: true, message: "Vehicle deleted successfully." });
  } catch (error) {
    const isForeignKey = error.message.includes("foreign key constraint");
    return Response.json(
      {
        success: false,
        message: isForeignKey
          ? "Cannot delete this vehicle because it has linked registrations or violations."
          : "Failed to delete vehicle.",
        error: error.message,
      },
      { status: 500 }
    );
  } finally {
    if (conn) conn.release();
  }
}