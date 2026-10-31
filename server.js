const express = require("express");
const fs = require("node:fs");

const app = express();

app.use(express.json());
app.use(express.static("public"));

let students = [];

app.get("/api/students", (req, res) => {
    res.json(students);
});

app.post("/api/students", (req, res) => {
    const student = {
        id: Date.now(),
        name: req.body.name,
        email: req.body.email
    };

    students.push(student);

    res.status(201).json(student);
});

app.delete("/api/students/:id", (req, res) => {
    students = students.filter(
        student => student.id !== Number(req.params.id)
    );

    res.json({ message: "Student deleted" });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});