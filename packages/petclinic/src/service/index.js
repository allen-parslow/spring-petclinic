import fetch from "isomorphic-fetch";

export default (service, url, options) => {
    return dispatch => {
      dispatch({type: service + "_PENDING"});
      return fetch(url, options)
        .then(
          response => { 
            if (response) {
              if (response.ok) {
                return response.json();
              } else {
                throw Error(response.statusText);
              }
            }
            throw Error("Unknown Error");
          },
          error => {
            throw Error("Failed to connect");
          }
      )
      .then(json => {
        dispatch({type: service + "_SUCCESS", payload: json});
      }).catch(error => {
        dispatch({type: service + "_ERROR", text: "" + error});
      });
    };
  };