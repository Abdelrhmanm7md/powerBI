import buttonRouter from "./Button/button.routes.js";
import tokenRouter from "./Token/token.routes.js";
export function init(app) {
  app.use("/api/v1/token", tokenRouter);
  app.use("/api/v1/button", buttonRouter);


  app.use("/", (req, res, next) => {
    // res.send("Page Not Found");
   return res.status(404).json({ message: "Page Not Found" });
  });

  app.all("*", (req, res, next) => {
    next(res.status(404).json({ message: "Page Not found" }));
  });
}
