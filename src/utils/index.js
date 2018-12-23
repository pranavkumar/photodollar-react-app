import { Font ,Permissions, Contacts} from "expo";
export async function loadFonts() {
  await Font.loadAsync({
    semiBold: require("../../assets/fonts/OpenSans-SemiBold.ttf"),
    light: require("../../assets/fonts/OpenSans-Light.ttf"),
    regular: require("../../assets/fonts/OpenSans-Regular.ttf")
  });
  this.setState({ fontLoaded: true });
}

export async function getContacts() {
  let newStatus = "denied";
  const { status } = await Permissions.getAsync(Permissions.CONTACTS);
  if (status != "granted") {
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    newStatus = status;
  }

  if (status == "granted" || newStatus == "granted") {
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.PHONE_NUMBERS]
    });

    data.forEach(contact => {
      // console.log(contact);
    });
  }
}
