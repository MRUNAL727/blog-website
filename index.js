const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const cors = require('cors')

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    methods: "GET, PUT, POST, DELETE"
  }

app.use(cors(corsOptions))


__dirname = path.resolve()
dotenv.config();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/images", express.static(path.join(__dirname, "/images")));


const PORT = process.env.PORT|| 5000;

const connection_url = process.env.MONGO_URL

mongoose.connect(connection_url, {  
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true}).then(
    console.log('Database connected')
)

// app.options('*', cors()) 
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

// app.get("*", (req,res)=>{
//   res.sendFile(path.resolve(__dirname, 'client', "build", 'index.html'))
// })
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });

  
  if(process.env.NODE_ENV= 'production'){
    app.use(express.static("client/build"))
  }


app.listen(PORT, console.log('Running on port 5000')); 