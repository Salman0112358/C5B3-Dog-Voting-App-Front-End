const onNetlify = process.env.NODE_ENV === "production";

const serverUrl = onNetlify
  ? "https://c5b3-dog-voting-app.herokuapp.com"
  : "http://localhost:4000";
export default serverUrl;