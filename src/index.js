import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import axios from "axios";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// async function test() {
//   await axios
//     .get(
//       `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/matcher.track.get?q_track=a%20te&q_artist=Jovanotti&f_has_lyrics=1&apikey=5449aff9a2f81408bf7449abb6a4e293`
//     )
//     .then((res) => {
//       console.log(res.data);
//     });
// }
// async function main() {
//   console.log("TEST!!!!!!!!!!!!");
//   await test();
//   console.log("TEST!!!!!!!!!!!!");
// }
// main();
