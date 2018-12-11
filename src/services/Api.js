import axios from "axios";

export const endpoint = "http://192.168.0.101:3000/api/";

export function autocomplete(str) {
  return axios.get(endpoint + "/maps/autocomplete?input=" + str);
}
