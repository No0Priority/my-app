import React, { useState, useEffect } from "react";
import axios from "axios";
import "./themes.css";

const Lyrics = ({ track_id, app_state_getter }) => {
  const [track_info, set_track_info] = useState({});
  const [lyrics, set_lyrics] = useState({});
  const [display, set_display] = useState(false);
  const [lyrics_text, set_lyrics_text] = useState("");

  const ui_text = {
    // Show lyrics
    lyrics_button: {
      EN: "Show lyrics",
      EST: "Näita laulu sõnad",
      RUS: "Показать слова песни",
    },
    //by
    by: {
      EN: "by",
      EST: ",looja:",
      RUS: "от",
    },
    Loading: {
      EN: "Loading...",
      EST: "Laadimine...",
      RUS: "Загрузка",
    },
    lyrics_missing: {
      EN: "Lyrics missing",
      EST: "Laulu sõnad puuduvad",
      RUS: "Слова отсутствуют",
    },
  };
  // -=-=-=-=-=- translate russian lyrics to english and back (funny i guess?)-=-=-=-=-=-
  // TRANSLATE API, limited amount of usage, else returns 429 ERR_BAD_REQUEST, at the moment of finishing I have hit the limit
  async function double_translate() {
    console.log("funny click");
    var options = {
      method: "GET",
      url: "https://translated-mymemory---translation-memory.p.rapidapi.com/api/get",
      params: {
        langpair: "ru|en",
        q: "Get lyrics for any song in Musixmatch database",
        mt: "1",
        onlyprivate: "0",
        de: "a@b.c",
      },
      headers: {
        "X-RapidAPI-Key": "a0f6b2edc0msh0c37f115932d01ep1ad397jsnab0e8a4fb44e",
        "X-RapidAPI-Host":
          "translated-mymemory---translation-memory.p.rapidapi.com",
      },
    };
    for (let i = 0; i < 2; i++) {
      options.params.q = i === 0 ? lyrics_text : options.params.q;
      await axios
        .request(options)
        .then((response) => {
          // console.log(response.data);
          options.params.q = response.data.responseData.translatedText;
          options.params.langpair =
            options.params.langpair === "ru|en" ? "en|ru" : "ru|en";
        })
        .catch(function (error) {
          console.error(error);
        });
    }
    let text = options.params.q;
    // for (let index = 0; index < 100; index++) {
    //   text.replace("\n", "&nbsp");
    // }
    set_lyrics_text(text);
    console.log(text);
  }
  //----------------------------------------------------------------------
  function toggle_display() {
    set_display(!display);
  }
  // -=-=-=-=-=- set lyrics and track info on track_id change -=-=-=-=-=-
  useEffect(() => {
    axios
      .get(
        `/proxy/track.lyrics.get?track_id=${track_id}&apikey=5449aff9a2f81408bf7449abb6a4e293`
      )
      .then((response) => {
        console.log(response);
        let lyrics = response.data.message.body.lyrics;
        let lyrics_string;
        try {
          lyrics_string = response.data.message.body.lyrics.lyrics_body;
        } catch {
          lyrics_string = "";
        }
        set_lyrics_text(lyrics_string);
        // console.log(lyrics);
        set_lyrics({ lyrics });

        return axios.get(
          `/proxy/track.get?track_id=${track_id}&apikey=5449aff9a2f81408bf7449abb6a4e293`
        );
      })
      .then((response) => {
        let track = response.data.message.body.track;
        // console.log(track);
        set_track_info({ track });
      })
      .catch((err) => console.log(err));
  }, [track_id]);
  //----------------------------------------------------------------------
  // -=-=-=-=-=- info not loaded (yet) -=-=-=-=-=-
  if (
    track_info === undefined ||
    lyrics === undefined ||
    Object.keys(track_info).length === 0 ||
    Object.keys(lyrics).length === 0
  ) {
    return (
      <h5 className={app_state_getter("theme")}>
        {ui_text.Loading[app_state_getter("language")]}
      </h5>
    );
    //----------------------------------------------------------------------
    // track has no lyrics
  } else if (lyrics.lyrics === undefined) {
    return (
      <h5 className={app_state_getter("theme")}>
        {ui_text.lyrics_missing[app_state_getter("language")]}
      </h5>
    );
    // -=-=-=-=-=- info loaded -=-=-=-=-=-
  } else {
    var display_property = display === true ? "block" : "none";
    return (
      <React.Fragment>
        <button onClick={toggle_display} className="btn btn-secondary m-2">
          {" "}
          {ui_text.lyrics_button[app_state_getter("language")]}
        </button>
        <button className="btn btn-secondary m-2" onClick={double_translate}>
          {" "}
          ???
        </button>
        <div style={{ display: display_property }}>
          <div className={`card ${app_state_getter("theme")}`}>
            <h5 className="card-header">
              {track_info.track.track_name}{" "}
              {ui_text.by[app_state_getter("language")]}{" "}
              <span className={`${app_state_getter("theme")}`}>
                {track_info.track.artist_name}
              </span>
            </h5>
            <div className="card-body">
              <p className="card-text" style={{ whiteSpace: "pre-wrap" }}>
                {lyrics_text}
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
};

export default Lyrics;
