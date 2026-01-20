import React, { Component } from "react";
import Navbar from "./components/static/Navbar";
import Search from "./components/static/Search";
import Tracks from "./components/content/Tracks";
import "./App.css";
class App extends Component {
  // -=-=-=-=-=- return theme if previously chosen, if not return default, change body bgcolor same principle  -=-=-=-=-=-
  get_local_theme =  () => {
    // console.log("get_local_theme");
    let theme;
    if (localStorage) {
      theme = localStorage.getItem("theme");
      theme = theme ? theme : "dark_theme";
      // console.log("localstorage");
      if (theme) {
        // console.log("theme");
        document.body.style.backgroundColor =
          theme === "dark_theme" ? "black" : "white";
      } else {
        // console.log("else1");
        document.body.style.backgroundColor = "white";
        theme = "light_theme";
      }
    } else {
      // console.log("else2");

      document.body.style.backgroundColor = "white";
      theme = "light_theme";
    }
    return theme;
  };
  //----------------------------------------------------------------------
  // -=-=-=-=-=- get previously chosen language -=-=-=-=-=-
  get_local_language = () => {
    if (localStorage) {
      let lang = localStorage.getItem("language");
      if (lang) {
        return lang;
      } else {
        return "EN";
      }
    }
  };
  //----------------------------------------------------------------------
  state = {
    searched_text: "",
    heading: "",
    track_list: [],
    language: this.get_local_language(),
    theme: this.get_local_theme(),
  };
  ui_text = {
    search_button: {
      EN: "Get Track Info",
      EST: "Näita laulu info",
      RUS: "Получить инфо о песне",
    },
  };
  // -=-=-=-=-=- App class state setter and getter -=-=-=-=-=-
  setter = (property, data) => {
    this.setState({ [property]: data });
    // console.log(this.state);
  };
  getter = (property) => {
    // console.log(this.state);

    return this.state[property];
  };
  //----------------------------------------------------------------------
  render() {
    return (
      <div>
        <Navbar app_state_getter={this.getter} app_state_setter={this.setter} />
        <div className="container">
          <Search
            app_state_setter={this.setter}
            app_state_getter={this.getter}
          />
          <Tracks
            app_state_setter={this.setter}
            app_state_getter={this.getter}
          />
        </div>
      </div>
    );
  }
}

export default App;
