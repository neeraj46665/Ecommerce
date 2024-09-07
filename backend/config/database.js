const mongoose = require("mongoose");

const connectDatabase = () => {
  const DB = process.env.DB_URI.replace("<PASSWORD>", process.env.DB_PASSWORD);

  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      // // useCreateIndex: true,
      // useFindAndModify: false,
      // useUnifiedTopology: true,
    })
    .then((data) =>
      console.log(`DB connection succesfull :${data.connection.host} 💽💾💾💾`)
    )
    .catch((err) => {
      console.log("MDB ERR :", err);
    });
};

module.exports = connectDatabase;

// mongoose
//   .connect(process.env.DB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // useCreateIndex: true,
//   })
//   .then((data) => {
//     console.log(`Mongodb connected with server: ${data.connection.host}`);
//   });
