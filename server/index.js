import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 4000;

const UPLOAD_DIR = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (_req, file, cb) {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    cb(null, `${Date.now()}-${base}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("File type not allowed"));
    }
  },
});

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(UPLOAD_DIR));

app.post("/upload", upload.single("file"), function (req, res, next) {
  const file = req.file?.filename;
  try {
    if (!file) {
      res.status(400).json({ ok: false, message: "No file uploaded" });
      return;
    }
    const publicPath = `${UPLOAD_DIR}/${file}`;
    const fileUrl = `http://localhost:4000/uploads/${file}`;
    res.json({
      ok: true,
      message: "File uploaded successfully",
      fileUrl,
      publicPath,
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error uploading file" });
    console.error(error);
  }
});

app.get("/download/:filename", (req, res) => {
  const safe = path.basename(req.params.filename);
  const filePath = path.join(UPLOAD_DIR, safe);
  res.download(filePath);
  console.log(filePath);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
