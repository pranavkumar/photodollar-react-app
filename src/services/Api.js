import axios from "axios";

export const endpoint = "http://192.168.0.100:3000/api/";

export function autocomplete(str) {
  return axios.get(endpoint + "/maps/autocomplete?input=" + str);
}

export function geocode(address) {
  return axios.get(endpoint + "/maps/geocode?address=" + address);
}

export function postRequest(request) {
  return axios.post(endpoint + "/URequests", request);
}
