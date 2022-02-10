import express from "express";
import nunjucks from "nunjucks";
import cookie from "cookie";

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.set("view engine", "njk");

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.render("home");
});

app.get("/options", (request, response) => {
  response.render("options");
});

const formParser = express.urlencoded({ extended: true });

app.post("/home", formParser, (request, response) => {
  const themeChoice = request.body.theme;
  response.set(
    "Set-Cookie",
    cookie.serialize("myCookie", themeChoice, {
      maxAge: 3600,
    }),
  );
  response.render("home", { themeChoice });
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
