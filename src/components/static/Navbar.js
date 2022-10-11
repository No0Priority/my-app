import React from "react";

const Navbar = ({ app_state_getter, app_state_setter }) => {
  const ui_text = {
    theme_button: {
      EN: "Invert theme",
      EST: "Inverteeri teemat",
      RUS: "Инвертировать тему",
    },
  };
  // -=-=-=-=-=- dark theme <-> light theme -=-=-=-=-=-
  const toggle_theme = () => {
    let new_theme =
      app_state_getter("theme") === "dark_theme" ? "light_theme" : "dark_theme";
    app_state_setter("theme", new_theme);
    let body_bgcolor = document.body.style.backgroundColor;
    // console.log("\n\n\n\nbody_bgcolor: \n\n\n\n" + body_bgcolor);
    document.body.style.backgroundColor =
      body_bgcolor === "black" ? "white" : "black";

    if (localStorage) {
      localStorage.setItem("theme", new_theme);
    }
  };
  //----------------------------------------------------------------------
  // -=-=-=-=-=- set language and add to localstorage -=-=-=-=-=-
  const lang_select_on_change = () => {
    let lang = document.getElementById("formsel").value;
    app_state_setter("language", lang);
    if (localStorage) {
      localStorage.setItem("language", lang);
    }
  };
  //----------------------------------------------------------------------
  return (
    <nav className="navbar navbar-dark bg-dark mb-5">
      <select
        id="formsel"
        onChange={lang_select_on_change}
        className="form-select"
        aria-label="Default select example"
      >
        <option value="EN">EN</option>
        <option value="EST">EST</option>
        <option value="RUS">RUS</option>
      </select>
      <span className="navbar-brand mb-0 h1 mx-auto">Inconvenient Lyrics</span>
      <button onClick={toggle_theme} className="btn btn-primary">
        {ui_text.theme_button[app_state_getter("language")]}
      </button>
    </nav>
  );
};

export default Navbar;
