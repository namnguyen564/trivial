const express = require("express");

const app = express();

const PORT = 3000;

app.get("/api/hello", (req,res) => {
   res.json({message: "hello"}) 
})





app.listen(PORT, function () {
    console.log("Listening at http://localhost:3000");
});

