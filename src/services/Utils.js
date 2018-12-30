import * as _ from "lodash";
import { Font, Permissions, Contacts } from "expo";
import * as Api from "./Api";
import update from "immutability-helper";
const moment = require("moment");
import { AsyncStorage } from "react-native";
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
          .replace(/\+/g, "")
          .replace(/\-/g, "").length > 0
      );
    });
    data = _.map(data, function(o) {
      if (o.id) {
        o.remoteId = o.id;
        delete o.id;
      }
      return o;
    });
    console.log(data[0]);
    return data;
  } else {
    return null;
  }
}

export async function syncContacts(uUserId, lastContactSync) {
  try {
    let delta = moment
      .duration(new moment(new Date()).diff(new moment(lastContactSync)))
      .as("seconds");

    if (delta >= 24 * 3600) {
      let contacts = await getContacts();
      let { status, data } = await Api.postContacts(uUserId, contacts);
      console.log(status);
    } else {
      console.log("too soon to sync contacts");
    }
  } catch (err) {
    throw err;
  }
}

export async function loadFonts() {
  await Font.loadAsync({
    semiBold: require("../../assets/fonts/OpenSans-SemiBold.ttf"),
    light: require("../../assets/fonts/OpenSans-Light.ttf"),
    regular: require("../../assets/fonts/OpenSans-Regular.ttf")
  });
  this.setState({ fontLoaded: true });
}

export async function getUser() {
  try {
    let uUser = await AsyncStorage.getItem("uUser", JSON.stringify(uUser));
    if (uUser) {
      this.setState(update(this.state, { uUser: { $set: JSON.parse(uUser) } }));
    }
  } catch (err) {
    throw err;
  }
}
