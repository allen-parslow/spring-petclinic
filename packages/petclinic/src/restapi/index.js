import fetch from "isomorphic-fetch";

const callApi = (service, url, options) => {
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
    })
    //.catch(error => {
    //  dispatch({type: service + "_ERROR", text: "" + error});
    //})
    ;
  };
};

class RestApi {
  get(name, url, options) {
    return callApi(name, url, options);
  }
  
  put(name, url, body, options) {
    return callApi(name, url, Object.assign({}, options, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }));
  }
}

export default new RestApi();