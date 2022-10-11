import React, { Component } from "react";
import Lyrics from "./Lyrics";
import "./themes.css";

class Track extends Component {
  // constructor(props) {
  //   super(props);
  // }
  // state = {
  //   show_lyrics: true,
  // };
  ui_text = {
    track: {
      EN: "Track",
      EST: "Trek",
      RUS: "Трэк",
    },
    album: {
      EN: "Album",
      EST: "Album",
      RUS: "Альбом",
    },
  };
  render() {
    const { track, app_state_getter, app_state_setter } = this.props;
    // console.log("testing undefined");
    // console.log(track.track_id);
    return (
      <div className="col-md-10 align-items-center">
        <div className={`card mb-4 shadow-sm ${app_state_getter("theme")}`}>
          <div className="card-body">
            <h5 className={app_state_getter("theme")}>{track.artist_name}</h5>
            <p className={`card-text ${app_state_getter("theme")}`}>
              <strong>
                <i className="fas fa-play" />{" "}
                {this.ui_text.track[app_state_getter("language")]}
              </strong>
              : {track.track_name}
              <br />
              <strong>
                <i className="fas fa-compact-disc" />{" "}
                {this.ui_text.album[app_state_getter("language")]}
              </strong>
              : {track.album_name}
            </p>
            <Lyrics
              track_id={track.track_id}
              app_state_getter={app_state_getter}
              app_state_setter={app_state_setter}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Track;
