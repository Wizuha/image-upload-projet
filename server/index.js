import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/hello", (req, res) => {
  const message = {
    data: "Hello world",
  };
  res.json(message);
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("File type not allowed"));
    }
  },
});

app.post("/upload", upload.single("file"), function (req, res, next) {
  const file = req.file?.filename;
  try {
    if (!file) {
      res.status(400).json({ ok: false, message: "No file uploaded" });
      return;
    }
    const fileUrl = `http://localhost:4000/upload/${file}`;
    res.json({
      ok: true,
      message: "File uploaded successfully",
      fileUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error uploading file" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
