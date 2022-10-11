import React from "react";
import Track from "./Track";
import "./themes.css";

const Tracks = ({ app_state_getter, app_state_setter }) => {
  // const { track_list, heading } = state;
  const track_list = app_state_getter("track_list");
  if (track_list === undefined || track_list.length === 0) {
    // return <h5>Loading...</h5>;
    return;
  } else {
    // console.log("test:");
    // console.log(track_list);

    return (
      <React.Fragment>
        <div className="row">
          {track_list.map((track_info) => (
            <Track
              key={track_info.track.track_id}
              track={track_info.track}
              app_state_getter={app_state_getter}
              app_state_setter={app_state_setter}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
};

export default Tracks;
