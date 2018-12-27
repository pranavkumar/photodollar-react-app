import { Font ,Permissions, Contacts} from "expo";
export async function loadFonts() {
  await Font.loadAsync({
    semiBold: require("../../assets/fonts/OpenSans-SemiBold.ttf"),
    light: require("../../assets/fonts/OpenSans-Light.ttf"),
    regular: require("../../assets/fonts/OpenSans-Regular.ttf")
  });
  this.setState({ fontLoaded: true });
}
