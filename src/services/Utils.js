import * as _ from "lodash";
import { Font, Permissions, Contacts } from "expo";
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

export async function getContacts() {
  let newStatus = "denied";
  const { status } = await Permissions.getAsync(Permissions.CONTACTS);
  if (status != "granted") {
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    newStatus = status;
  }

  if (status == "granted" || newStatus == "granted") {
    let { data } = await Contacts.getContactsAsync({
      fields: [Contacts.PHONE_NUMBERS]
    });
    data = _.filter(data, function(o) {
      let name = o.name;
      return (
        name
          .replace(/ /g, "")
          .replace(/[0-9]/g, "")
          .replace(/\+/g, "").length > 0
      );
    });
    return data;
  } else {
    return null;
  }
}
