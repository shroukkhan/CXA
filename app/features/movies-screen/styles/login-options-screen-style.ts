import EStyleSheet from "react-native-extended-stylesheet"
import ApplicationThemes from "../../../theme/theme"
import { color } from "../../../theme"

export default EStyleSheet.create({
  ...ApplicationThemes.screen,
  container: {
    ...ApplicationThemes.screen.mainContainer,
    flex: 1,
    justifyContent: "center",
    backgroundColor: color.background,
  },

})
