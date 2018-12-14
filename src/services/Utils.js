export function formDataFromImage(image) {
  let data = new FormData();
  let filename = image.uri.split("/").pop();
  let ext = filename.split(".").pop();
  data.append("image", {
    uri: image.uri,
    name: filename,
    type: "image/" + ext
  });
  return data;
}
