import axios from "axios";

export const API_ENDPOINT = "http://192.168.0.100:3000/api/";
export const FILE_ENDPOINT = "http://192.168.0.100:5500/files/";

export function autocomplete(str) {
  return axios.get(API_ENDPOINT + "/maps/autocomplete", { params: { input: str } });
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
    params: { filter: JSON.stringify({ include: ["UResponses","UUser"] }) }
  });
}

export function postFile(container, formData) {
  return fetch(API_ENDPOINT + "/storage/" + container + "/upload", {
    method: "POST",
    body: formData
  });
}

export function postResponse(response) {
  return axios.post(
    `${API_ENDPOINT}/URequests/${response.requestId}/UResponses/`,
    response
  );
}
