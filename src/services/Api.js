import axios from "axios";

export const API_ENDPOINT = "http://192.168.0.100:6161/api/";
export const FILE_ENDPOINT = "http://192.168.0.100:5500/files/";

async function errorHandler(promise) {
  try {
    let res = await promise;
    return { data: res.data, status: res.status };
  } catch (err) {
    throw err.response.data.error;
  }
}


export function autocomplete(str) {
  return axios.get(API_ENDPOINT + "/maps/autocomplete", {
    params: { input: str }
  });
}

export function geocode(address) {
  return axios.get(API_ENDPOINT + "/maps/geocode", {
    params: { address: address }
  });
}

export function postRequest(request) {
  return axios.post(API_ENDPOINT + "/URequests", request);
}

export function getRequests() {
  return axios.get(API_ENDPOINT + "/URequests", {
    params: { filter: JSON.stringify({ include: ["UResponses", "UUser"] }) }
  });
}

export function getFeed(uUserId) {
  return errorHandler(axios.get(`${API_ENDPOINT}/UUsers/${uUserId}/feed`));
}

export function signinUser(type, user) {
  return errorHandler(
    axios.get(`${API_ENDPOINT}/UUsers/signin`, {
      params: { type: type, user: JSON.stringify(user) }
    })
  );
}

export function getUserProfile(id) {
  return errorHandler(axios.get(`${API_ENDPOINT}UUsers/${id}`));
}

export function postFile(container, formData) {
  return fetch(API_ENDPOINT + "/storage/" + container + "/upload", {
    method: "POST",
    body: formData
  });
}

export function postResponse(response) {
  return errorHandler(
    axios.post(
      `${API_ENDPOINT}/URequests/${response.requestId}/UResponses/`,
      response
    )
  );
}

export function addNotificationToken(id, tokenObj) {
  // console.log(tokenObj);
  return errorHandler(
    axios.post(`${API_ENDPOINT}/UUsers/${id}/notificationTokens`, tokenObj)
  );
}

export function saveDeviceLocation(id, locationObj) {
  return errorHandler(
    axios.post(`${API_ENDPOINT}/UUsers/${id}/saveDeviceLocation`, locationObj)
  );
}

export function geocodeReverse(lat, lng) {
  return errorHandler(
    axios.get(`${API_ENDPOINT}/maps/geocodeReverse`, { params: { lat, lng } })
  );
}

export function toggleExpectator(requestId, expectator) {
  return errorHandler(
    axios.post(
      `${API_ENDPOINT}/URequests/${requestId}/expectations/`,
      expectator
    )
  );
}

export function toggleHideRequest(requestId, uUserId) {
  return errorHandler(
    axios.get(`${API_ENDPOINT}/URequests/${requestId}/toggleHide/${uUserId}`)
  );
}

export function flagRequest(requestId, flagger) {
  return errorHandler(
    axios.post(`${API_ENDPOINT}/URequests/${requestId}/flag/`, flagger)
  );
}

export function postContacts(uUserId, contacts) {
  return errorHandler(
    axios.post(`${API_ENDPOINT}/UUsers/${uUserId}/contacts/multi`, contacts)
  );
}

export function postForwards(URequestId, forward) {
  return errorHandler(
    axios.post(`${API_ENDPOINT}/URequests/${URequestId}/forwards`, forward)
  );
}

export function getForwardables(uUserId, uRequestId) {
  return errorHandler(
    axios.get(`${API_ENDPOINT}/UUsers/${uUserId}/forwardables`, {
      params: { uRequestId: uRequestId }
    })
  );
}
