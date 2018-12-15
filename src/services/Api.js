import axios from "axios";

export const endpoint = "http://192.168.0.100:3000/api/";

export function autocomplete(str) {
  return axios.get(endpoint + "/maps/autocomplete", { params: { input: str } });
}

export function geocode(address) {
  return axios.get(endpoint + "/maps/geocode", {
    params: { address: address }
  });
}

export function postRequest(request) {
  return axios.post(endpoint + "/URequests", request);
}

export function getRequests() {
  return axios.get(endpoint + "/URequests");
}

export function postFile(container, formData) {
  return fetch(endpoint + "/storage/" + container + "/upload", {
    method: "POST",
    body: formData
  });
}

export function postResponse(response) {
  return axios.post(`${endpoint}/UResponses/`, response);
}
