const express = require("express");
const cors = require("cors");
const mysql = require("mysql");



const app = express();
app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
})

app.get("/", (req, res) => {
    const sql = "SELECT ID, Name, Email, PhoneNumber, DATE_FORMAT(DateofBirth, '%Y-%m-%d') AS DateofBirth FROM detailsofemployee";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    });
});

app.post('/create', (req, res) => {
    const sql = "INSERT INTO detailsofemployee (Name, Email, PhoneNumber, DateofBirth) VALUES (?, ?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.phonenumber,
        req.body.dateofbirth
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ error: "Error inserting data" });
        }
        
        console.log("Data inserted successfully");
        return res.status(200).json({ message: "Data inserted successfully" });
    });
});

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    // Check if the ID exists before updating
    db.query("SELECT * FROM detailsofemployee WHERE ID = ?", id, (err, rows) => {
        if (err) {
            console.error("Error checking ID:", err);
            return res.status(500).json({ error: "Error checking ID" });
        }
        
        if (rows.length === 0) {
            console.log("No record found for ID:", id);
            return res.status(404).json({ error: "No record found for ID" });
        }

        // ID exists, proceed with the update
        const sql = "UPDATE detailsofemployee SET `Name`=?, `Email`=?, `PhoneNumber`=?, `DateofBirth`=? WHERE ID = ?";
        const values = [
            req.body.name,
            req.body.email,
            req.body.phonenumber,
            req.body.dateofbirth,
            id
        ];
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error("Error updating data:", err);
                return res.status(500).json({ error: "Error updating data" });
            }
            
            console.log("Data updated successfully");
            return res.status(200).json({ message: "Data updated successfully" });
        });
    });
});

app.delete('/student/:id', (req, res) => {
    const sql = "DELETE FROM detailsofemployee WHERE ID = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting data:", err);
            return res.status(500).json({ error: "Error deleting data" });
        }
        
        return res.status(200).json({ message: "Data deleted successfully" });
    });
});
// Assuming 'app' is your Express app
app.get('/view/:id', (req, res) => {
    const id = req.params.id;
    // Assuming 'db' is your database connection
    const sql = "SELECT * FROM detailsofemployee WHERE ID = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error fetching student details:", err);
            return res.status(500).json({ error: "Error fetching student details" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Student not found" });
        }
        // Assuming the result is an array with a single student object
        return res.status(200).json(result[0]);
    });
});





app.listen(8081, () =>{
    console.log("listening");
})