import app from "./app";

app.listen(process.env.EXPRESS_PORT, () => {
  console.log(`Server is running on port ${process.env.EXPRESS_PORT}`);
});
