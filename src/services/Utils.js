import * as _ from "lodash";
export function formDataFromImage(image, meta) {
  let data = new FormData();
  let filename = image.uri.split("/").pop();
  let ext = filename.split(".").pop();
  meta = meta || {};
  data.append("image", {
    uri: image.uri,
    name: filename,
    type: "image/" + ext,
    meta: meta
  });

  return data;
}
