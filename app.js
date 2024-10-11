const morgan = require("morgan");
const express = require("express");
const usersRoute = require("./routes/usersRoute");
const carsRoute = require("./routes/carsRoute");
const sparepartsRoute = require("./routes/sparepartsRoute");
const driverRoutes = require("./routes/driverRoute");

const app = express();
const port = 3000;

// Middleware : Reading json from body (client)
app.use(express.json());

// Middleware: LOGGING third part package
app.use(morgan());
// Own Middleware 
app.use((req, res, next) => {
  console.log('incoming request....')
  // Better logging
  next();
});

// Logging basic
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log("Request time: ");
  console.log(req.requestTime);
  // Better logging
  next();
});
app.use((req, res, next) => {
  req.username = "brandon"
  console.log("Requested by: ");
  console.log(req.username);
  // Better logging
  next();
});
app.use((req, res, next) => {
  console.log("API requested: ");
  console.log(req.originalUrl);
  // Better logging
  next();
});


// Health Check
app.get("/", async (req, res) => {
  try {
    res.status(200).json({
      status: "Succeed",
      message: "Ping successfully",
      isSuccess: true,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Ping failed",
      isSuccess: false,
      error: error.message,
    });
  }
});

// Routes
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/cars", carsRoute);
app.use("/api/v1/spareparts", sparepartsRoute);
app.use("/api/v1/drivers", driverRoutes);

// Middleware to handle page not found
app.use((req, res, next) => {
  res.status(404).json({
    status: "Failed",
    message: "API not found !",
    isSuccess: false,
  });
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
