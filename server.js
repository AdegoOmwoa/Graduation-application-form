const express = require("express");
const app = express();
const coursesRouter  = require("./routes/courses");
const multer = require("multer");
const fs= require("fs");
const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0/courseCredits");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.get("/", (req, res) => {
    res.render("validation/home")
})

app.use("/", coursesRouter);

const fileSchema = new mongoose.Schema({
    filename: String,
    path: String,
    fieldname: String,
});

const File = mongoose.model('File', fileSchema);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.send(`
    <form action="/upload" method="post" enctype="multipart/form-data">
      <label for="kcse-certificate">Upload KCSE Certificate:</label>
      <input type="file" id="kcse-certificate" name="kcse-certificate" accept="image/*">
      <br><br>
      
      <label for="course-checklist">Upload Course Checklist:</label>
      <input type="file" id="course-checklist" name="course-checklist" accept="image/*">
      <br><br>
      
      <input type="submit" value="Submit">
    </form>
  `);
});

app.post('/upload', upload.fields([{ name: 'kcse-certificate', maxCount: 1 }, { name: 'course-checklist', maxCount: 1 }]), async (req, res) => {
    try {
        const kcseCertificateFile = req.files['kcse-certificate'][0];
        const courseChecklistFile = req.files['course-checklist'][0];

        const kcseFileRecord = new File({
            filename: kcseCertificateFile.originalname,
            path: kcseCertificateFile.path,
            fieldname: 'kcse-certificate',
        });

        const courseFileRecord = new File({
            filename: courseChecklistFile.originalname,
            path: courseChecklistFile.path,
            fieldname: 'course-checklist',
        });

        await kcseFileRecord.save();
        await courseFileRecord.save();

        res.send(`Files uploaded successfully.`);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(5000)