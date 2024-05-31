import bcrypt, { hash } from "bcrypt";
import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const users = [
  {
    username: "elodie",
    password: "$2b$13$eiIbwUhPglzr2mrxW0K.8uDUTcwCHkmq.KkTE5EzcOWzj6.z56Alu",
  },
];

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) {
    res.json({ success: false, message: "wrong user" });
    return;
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    res.json({ success: false, message: "wrong password" });
    return;
  }

  res.json({ success: true, message: "login success" });
  console.log(users);
});

app.listen(8080, () => console.log("listening on port 8080"));
