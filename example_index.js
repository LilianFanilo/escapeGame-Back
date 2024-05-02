import bcrypt, { hash } from "bcrypt";
import express from "express";

const app = express();
app.use(express.json());

const users = [];

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 13);
  users.push({
    username,
    password: hash,
  });

  console.log(users);
  res.send("ok");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) {
    res.send("wrong user");
    return;
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    res.send("wrong password");
    return;
  }

  res.send("ok");
});

app.listen(8080, () => console.log("listening on port 8080"));
