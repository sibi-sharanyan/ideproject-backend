const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000 ;
const { c, cpp, node, python, java } = require("compile-run");
app.use(express.json());
app.use(cors());

const modes = [python, cpp, java, node];

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/runcode", (req, res) => {
  console.log(req.body);

  let resultPromise = modes[req.body.selectedMode].runSource(req.body.code, {
    stdin: req.body.stdin,
  });
  resultPromise
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});


// const { exec } = require("child_process");

// exec("whereis gcc", (error, stdout, stderr) => {
//     if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
// });



app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
