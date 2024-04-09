import express from "express";

const app = express();

app.use(express.json());

import {
  getDeadStock,
  getHistoryCard,
  updateDeadStock,
  updateHistoryCard,
  insertProblem,
} from "./Database.js";

//for getting deadstock info of some specific unit
app.get("/deadstock/:lab_id/:cat_id/:unit_id", async (req, res) => {
  const { lab_id, cat_id, unit_id } = req.params;
  const deadstock = await getDeadStock(lab_id, cat_id, unit_id);
  res.send(deadstock);
});

//get history card of specific unit
app.get("/history_card/:lab_id/:cat_id/:unit_id", async (req, res) => {
  const { lab_id, cat_id, unit_id } = req.params;
  const historyCard = await getHistoryCard(lab_id, cat_id, unit_id);
  res.send(historyCard);
});

//to update deadstock description
app.patch("/deadstock",async (req, res) => {
  const {
    lab_id,
    cat_id,
    unit_id,
    new_description
  } = req.body;
  const updatedDeadStock = await updateDeadStock(
    lab_id,
    cat_id,
    unit_id,
    new_description
  );
  res.status(200).send(updatedDeadStock);
})

//to update history card rememdy and work_completion_date
app.patch("/history_card", async(req,res) => {
  const{
    lab_id,
    cat_id,
    unit_id,
    problem_id,
    remedy_taken,
    work_completion_date,
  } = req.body;
  const updatedHistoryCard = await updateHistoryCard(
    lab_id,
    cat_id,
    unit_id,
    problem_id,
    remedy_taken,
    work_completion_date,
  );
  res.status(200).send(updatedHistoryCard);
})

//to insert new problem in history card
app.post("/history_card", async (req, res) => {
  const {
    lab_id,
    cat_id,
    unit_id,
    problem_id,
    problem_description,
    report_date,
    remedy_taken,
    work_completion_date,
  } = req.body;
  const newProblem = await insertProblem(
    lab_id,
    cat_id,
    unit_id,
    problem_id,
    problem_description,
    report_date,
    remedy_taken,
    work_completion_date
  );
  res.status(201).send(newProblem);
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.log("Example app listening on port 8080!");
});
