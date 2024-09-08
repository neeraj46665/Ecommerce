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
    );
};

module.exports = connectDatabase;
