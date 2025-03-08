const express = require("express")
const PORT = 3000
let Courses = require('./data')

const app  = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./views'))

app.set("view engine", "ejs")
app.set("views", "./views")

app.get("/", (req, res) => {
    return res.render("index", {Courses})
})

app.post("/save", (req, res) => {

    const params = {
        id: req.body.id,
        name: req.body.name,
        course_type: req.body.course_type,
        semester: req.body.semester,
        department: req.body.department
    }

    Courses.push(params)

    return res.redirect("/")
})

app.post("/delete/:id", (req,res) => {
    const id = parseInt(req.params.id);

    if(id) {
        Courses = Courses.filter(course => course.id !== id);
    }

    return res.redirect("/");
})


app.listen(PORT, () => console.log(`server listen port ${PORT}`))