import express from "express";
import cors from "cors";
import { createConnection } from "mysql";
const app = express();
app.use(express.json());
app.use(cors());
const conn = createConnection({
  host: "localhost",
  user: "root",
  password: "Jacksparrow@95",
  database: "project",
});
conn.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("database connected!!");
  }
});

app.post("/form", (request, response) => {
  const insQuery = `insert into form values(${request.body.orderid},
    '${request.body.firstname}',
  '${request.body.lastname}',
  '${request.body.email}',
  '${request.body.mobileno}',
  '${request.body.Address}')`;
  conn.query(insQuery, (error, result) => {
    if (error) {
      response.status(500).send({ message: "problem at server" });
    } else {
      response.status(200).send({ message: "sucessfully registered" });
    }
  });
});
app.get("/form/:orderid", (request, response) => {
  const fectquery =
    `select * from form where orderid =` + request.params.orderid;
  conn.query(fectquery, (error, result) => {
    if (error) {
      response.status(500).send({ message: "problem at server" });
    } else {
      response.status(200).send(result);
    }
  });
});
app.post("/orders", (request, response) => {
  const insQuery = `insert into orders values(${request.body.orderid},
    ${request.body.familypack},
  ${request.body.cornetto},
  ${request.body.kulfi},
  ${request.body.stick},
  ${request.body.cone},${request.body.price})`;
  conn.query(insQuery, (error, result) => {
    if (error) {
      response.status(500).send({ message: "problem at server" });
    } else {
      response.status(200).send({ message: "sucessfully registered" });
    }
  });
});
app.get("/orders/:orderid", (request, response) => {
  const fectquery =
    `select * from orders where orderid =` + request.params.orderid;
  conn.query(fectquery, (error, result1) => {
    if (error) {
      response.status(500).send({ message: "problem at server" });
    } else {
      response.status(200).send(result1);
    }
  });
});
app.listen(9800, () => {
  console.log("listening on port 9800");
});
