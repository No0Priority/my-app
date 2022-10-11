import React, { useState, useEffect } from "react";
import axios from "axios";
import "../content/themes.css";
// "ERR_BAD_REQUEST"
const Search = ({ app_state_getter, app_state_setter }) => {
  const [user_input, set_user_input] = useState("");
  const [track_title, set_track_title] = useState("");
  // const [chosen_language, set_chosen_language] = useState("en");
  var ui_text = {
    search_heading: {
      EN: "Search For A Song",
      EST: "Otsi Laulu",
      RUS: "Поиск Песен",
    },
    search_description: {
      EN: "Get lyrics for any song in Musixmatch database",
      EST: "Näita mistahes laulu sõnu Musixmatchi andmebaasist",
      RUS: "Получить тексты для любой песни в базе данных Musixmatch",
    },
    placeholder: {
      EN: "Song title...",
      EST: "Laulu pealkiri",
      RUS: "Название песни...",
    },
    search_button: {
      EN: "Get Track Info",
      EST: "Näita laulu info",
      RUS: "Получить инфо о песне",
    },
    search_results: {
      EN: "Search results",
      EST: "Otsingu tulemused",
      RUS: "Результаты поиска",
    },
  };

  //
  // LANGUAGE DETECT
  // let test = "I like apples & oranges";
  // test = test.split(" ").join("%20").replace("&", "%26");
  // axios
  //   .get(
  //     `/proxy2/detect?access_key=4a66ccc75b7d627285907edab494b72f&query=${test}`
  //   )
  //   .then((response) => {
  //     console.log("detection:");
  //     console.log(response);
  //   })
  //   .catch((err) => console.log(err));
  useEffect(() => {
    if (track_title) {
      // console.log("track title: " + track_title);
      axios
        .get(
          `/proxy/track.search?q_track=${track_title}&page_size=10&page=10&s_track_rating=desc&has_lyrics=1&apikey=5449aff9a2f81408bf7449abb6a4e293`
        )
        .then((response) => {
          console.log(response);
          let track_list = response.data.message.body.track_list;
          app_state_setter("track_list", track_list);
          app_state_setter(
            "heading",
            ui_text.search_results[app_state_getter("language")]
          );
        })
        .catch((err) => console.log(err));
    }
  }, [track_title]);

  const find_track = (e) => {
    e.preventDefault();
    set_track_title(user_input);
    set_user_input("");
  };

  const on_change = (e) => {
    set_user_input(e.target.value);
  };
  // console.log("lang test: ");
  // // const heading = app_state_getter("language");
  return (
    <React.Fragment>
      <div className={`card card-body m-4 p-4 ${app_state_getter("theme")}`}>
        <h1 className={`display-4 text-center ${app_state_getter("theme")}`}>
          <i className={app_state_getter("theme")} />
          {ui_text.search_heading[app_state_getter("language")]}
        </h1>
        <p className={`lead text-center ${app_state_getter("theme")}`}>
          {ui_text.search_description[app_state_getter("language")]}
        </p>
        <form onSubmit={find_track}>
          <div className="form-group">
            <input
              id="search"
              type="text"
              className={`form-control form-control-lg ${app_state_getter(
                "theme"
              )}`}
              placeholder={ui_text.placeholder[app_state_getter("language")]}
              name="user_input"
              value={user_input}
              onChange={on_change}
            />
          </div>
          <button
            className="btn btn-primary btn-lg btn-block mb-2"
            type="submit"
          >
            {ui_text.search_button[app_state_getter("language")]}
          </button>
        </form>
      </div>
      <h3 className="text-center mb-4 text-light">
        {ui_text.search_results[app_state_getter("language")]}
      </h3>
    </React.Fragment>
  );
};

export default Search;
