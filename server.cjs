// const express = require("express");
// const fs = require("fs");
// const cors = require("cors");
// const multer = require("multer");
// const path = require("path");

// const app = express();

// app.use(cors());
// app.use(express.json());

// // =======================
// // FILE PATH
// // =======================
// // const FILE = "./data/articles.json";
// const FILE = path.join(__dirname, "data", "articles.json");

// // =======================
// // MULTER CONFIG (IMPORTANT)
// // =======================
// const storage = multer.diskStorage({

//   destination: (req, file, cb) => {
//     // cb(null, "uploads"); // uploads folder
//     cb(null, path.join(__dirname, "uploads"));
//   },

//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }

// });

// const upload = multer({ storage });

// // serve uploaded images
// // app.use("/uploads", express.static("uploads"));
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // =======================
// // UPLOAD IMAGE API
// // =======================
// app.post("/api/upload", upload.single("image"), (req, res) => {

//   res.json({
//     // imageUrl: `http:///api/uploads/${req.file.filename}`
//     imageUrl: `/uploads/${req.file.filename}`
//   });

// });

// // =======================
// // GET ALL ARTICLES
// // =======================
// app.get("/api/articles", (req, res) => {
//   const data = JSON.parse(fs.readFileSync(FILE));
//   res.json(data);
// });

// // =======================
// // GET SINGLE ARTICLE
// // =======================
// // app.get("/api/articles/:slug", (req, res) => {
// //   const data = JSON.parse(fs.readFileSync(FILE));

// //   const article = data.find(a => a.slug === req.params.slug);

// //   res.json(article);
// // });

// // =======================
// // GET SINGLE ARTICLE (FIXED)
// // =======================
// // app.get("/api/articles/:id", (req, res) => {

// //   const id = req.params.id;

// //   // const article = articles.find(a => a.id == id);
// //   const data = JSON.parse(fs.readFileSync(FILE));

// //   const article = data.find(a => a.id == id);

// //   if (!article) {
// //     return res.status(404).json({ message: "Article not found" });
// //   }

// //   res.json(article);

// // });

// app.get("/api/articles/:slug", (req, res) => {

//   const data = JSON.parse(fs.readFileSync(FILE));

//   const article = data.find(a => a.slug === req.params.slug);

//   if (!article) {
//     return res.status(404).json({ message: "Article not found" });
//   }

//   res.json(article);
// });

// // =======================
// // CREATE ARTICLE
// // =======================
// app.post("/api/articles", (req, res) => {

//   const data = JSON.parse(fs.readFileSync(FILE));

//   const newArticle = {
//     id: Date.now(),
//     ...req.body
//   };

//   data.push(newArticle);

//   fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

//   res.json(newArticle);
// });

// // =======================
// // DELETE ARTICLE
// // =======================
// app.delete("/api/articles/:id", (req, res) => {

//   const data = JSON.parse(fs.readFileSync(FILE));

//   const filtered = data.filter(a => a.id != req.params.id);

//   fs.writeFileSync(FILE, JSON.stringify(filtered, null, 2));

//   res.json({ message: "Article deleted" });

// });

// // =======================
// // UPDATE ARTICLE
// // =======================
// app.put("/api/articles/:id", (req, res) => {

//   const data = JSON.parse(fs.readFileSync(FILE));

//   const updated = data.map(article => {

//     if (article.id == req.params.id) {
//       return { ...article, ...req.body };
//     }

//     return article;

//   });

//   fs.writeFileSync(FILE, JSON.stringify(updated, null, 2));

//   res.json({ message: "Article updated" });

// });

// // =======================
// // SERVER (LAST ME HOGA)
// // =======================

// // app.listen(5000, () => {
// //   console.log("Server running on port 5000");
// // });

// const PORT = process.env.PORT || 3000;

// app.use(express.static(path.join(__dirname, "../dist")));

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../dist/index.html"));
// });

// // TIME API
// app.put("/api/articles/time/:id", ...);

// // CLICK API
// app.put("/api/articles/click/:id", ...);

// app.listen(PORT, () => {
//   console.log("Server running on port", PORT);
// });


// //=============================
// //   BreakingNews stock strip 
// //=============================

// // const STOCK_FILE = "./data/stocks.json";
// const STOCK_FILE = path.join(__dirname, "data", "stocks.json");
// // GET
// app.get("/api/stocks", (req, res) => {
//   const data = JSON.parse(fs.readFileSync(STOCK_FILE));
//   res.json(data);
// });

// // ADD
// app.post("/api/stocks", (req, res) => {
//   const data = JSON.parse(fs.readFileSync(STOCK_FILE));

//   const newStock = {
//     id: Date.now(),
//     ...req.body
//   };

//   data.unshift(newStock);

//   fs.writeFileSync(STOCK_FILE, JSON.stringify(data, null, 2));

//   res.json(newStock);
// });

// // DELETE
// app.delete("/api/stocks/:id", (req, res) => {
//   const data = JSON.parse(fs.readFileSync(STOCK_FILE));

//   const filtered = data.filter(item => item.id != req.params.id);

//   fs.writeFileSync(STOCK_FILE, JSON.stringify(filtered, null, 2));

//   res.json({ message: "Deleted" });
// });


// //**********View count , click count etc here*************

// app.put("/api/articles/view/:id", (req, res) => {
//   try {
//     const data = JSON.parse(fs.readFileSync(FILE));

//     const article = data.find(a => a.id == req.params.id);

//     if (!article) {
//       return res.status(404).json({ error: "Article not found" });
//     }

//     article.views = (article.views || 0) + 1;

//     fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

//     res.json(article);

//   } catch (error) {
//     console.log("❌ VIEW ERROR:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// //TIME API

// app.put("/api/articles/time/:id", (req, res) => {
//   try {
//     const data = JSON.parse(fs.readFileSync(FILE));

//     const article = data.find(a => a.id == req.params.id);

//     if (!article) {
//       return res.status(404).json({ error: "Article not found" });
//     }

//     const time = Number(req.body.time) || 0;

//     article.totalTime = (article.totalTime || 0) + time;

//     fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

//     res.json(article);

//   } catch (error) {
//     console.log("❌ TIME ERROR:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });


// //CLICK API

// app.put("/api/articles/click/:id", (req, res) => {
//   try {
//     const data = JSON.parse(fs.readFileSync(FILE));

//     const article = data.find(a => a.id == req.params.id);

//     if (!article) {
//       return res.status(404).json({ error: "Article not found" });
//     }

//     article.clicks = (article.clicks || 0) + 1;

//     fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

//     res.json(article);

//   } catch (error) {
//     console.log("❌ CLICK ERROR:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });


const express = require("express");
const fs = require("fs");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// =======================
// FILE PATH
// =======================
const FILE = path.join(__dirname, "data", "articles.json");

// =======================
// MULTER CONFIG
// =======================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =======================
// UPLOAD IMAGE API
// =======================
app.post("/api/upload", upload.single("image"), (req, res) => {
  res.json({
    imageUrl: `/uploads/${req.file.filename}`
  });
});

// =======================
// GET ALL ARTICLES
// =======================
app.get("/api/articles", (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE));
  res.json(data);
});

// =======================
// GET SINGLE ARTICLE (SLUG)
// =======================
app.get("/api/articles/:slug", (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE));

  const article = data.find(a => a.slug === req.params.slug);

  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  res.json(article);
});

// =======================
// CREATE ARTICLE
// =======================
app.post("/api/articles", (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE));

  const newArticle = {
    id: Date.now(),
    ...req.body
  };

  data.push(newArticle);

  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

  res.json(newArticle);
});

// =======================
// DELETE ARTICLE
// =======================
app.delete("/api/articles/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE));

  const filtered = data.filter(a => a.id != req.params.id);

  fs.writeFileSync(FILE, JSON.stringify(filtered, null, 2));

  res.json({ message: "Article deleted" });
});

// =======================
// UPDATE ARTICLE
// =======================
app.put("/api/articles/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE));

  const updated = data.map(article => {
    if (article.id == req.params.id) {
      return { ...article, ...req.body };
    }
    return article;
  });

  fs.writeFileSync(FILE, JSON.stringify(updated, null, 2));

  res.json({ message: "Article updated" });
});

// =======================
// STOCK FILE PATH
// =======================
const STOCK_FILE = path.join(__dirname, "data", "stocks.json");

// =======================
// STOCK APIs
// =======================
app.get("/api/stocks", (req, res) => {
  const data = JSON.parse(fs.readFileSync(STOCK_FILE));
  res.json(data);
});

app.post("/api/stocks", (req, res) => {
  const data = JSON.parse(fs.readFileSync(STOCK_FILE));

  const newStock = {
    id: Date.now(),
    ...req.body
  };

  data.unshift(newStock);

  fs.writeFileSync(STOCK_FILE, JSON.stringify(data, null, 2));

  res.json(newStock);
});

app.delete("/api/stocks/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(STOCK_FILE));

  const filtered = data.filter(item => item.id != req.params.id);

  fs.writeFileSync(STOCK_FILE, JSON.stringify(filtered, null, 2));

  res.json({ message: "Deleted" });
});

// =======================
// VIEW / TIME / CLICK APIs
// =======================
app.put("/api/articles/view/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE));
  const article = data.find(a => a.id == req.params.id);

  if (!article) return res.status(404).json({ error: "Not found" });

  article.views = (article.views || 0) + 1;

  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
  res.json(article);
});

app.put("/api/articles/time/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE));
  const article = data.find(a => a.id == req.params.id);

  if (!article) return res.status(404).json({ error: "Not found" });

  const time = Number(req.body.time) || 0;
  article.totalTime = (article.totalTime || 0) + time;

  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
  res.json(article);
});

app.put("/api/articles/click/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE));
  const article = data.find(a => a.id == req.params.id);

  if (!article) return res.status(404).json({ error: "Not found" });

  article.clicks = (article.clicks || 0) + 1;

  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
  res.json(article);
});

// =======================
// REACT FRONTEND SERVE
// =======================
app.use(express.static(path.join(__dirname, "../dist")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// =======================
// SERVER START
// =======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

