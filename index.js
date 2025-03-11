const express = require("express")
const multer = require("multer")
const PORT = 3000
let Courses = require('./data')
let docClient = require("./configs/aws.configs")

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./views'))

app.set("view engine", "ejs")
app.set("views", "./views")

const tableName = "Subject"
const upload = multer()

app.get("/", (req, res) => {

    const params = {
        TableName: tableName,
    }

    docClient.scan(params, (err, data) => {
        if (err) {
            console.log(err)
            res.send("internal server error")
        } else {
            return res.render("index", { Courses: data.Items });
        }
    })
})

app.post("/save", (req, res) => {

    const params = {
        TableName: tableName,
        Item: {
            id: Number(req.body.id),
            name: req.body.name,
            course_type: req.body.course_type,
            semester: req.body.semester,
            department: req.body.department
        }
    };

    docClient.put(params, (err, data) => {
        if (err) {
            console.error("Error saving item:", err);
            return res.status(500).send("Internal");
        }
        res.redirect("/");
    });
});


app.post("/delete/:id", (req, res) => {

    const params = {
        TableName: tableName,
        Key: { id: Number(req.params.id) }
    };

    docClient.delete(params, (err, data) => {
        if (err) {
            console.error("Error deleting item:", err);
            return res.status(500).send("Internal Server Error");
        }
        return res.redirect("/");
    });
})


app.listen(PORT, () => console.log(`server listen port ${PORT}`))