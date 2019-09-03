import { createStackNavigator } from "react-navigation"
// tslint:disable-next-line
import { createAppContainer } from "@react-navigation/native"
import MoviesScreen from "../../features/movies-screen/movies-screen"

const AppNavigation = createStackNavigator(
  {

    MoviesScreen: { screen: MoviesScreen },
  },
  {
    initialRouteName: "MoviesScreen",
    headerMode: "none",
  },
)

export default createAppContainer(AppNavigation)
