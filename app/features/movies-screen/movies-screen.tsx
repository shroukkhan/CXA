import * as React from "react"
import { NavigationScreenProps } from "react-navigation"
import { connect } from "react-redux"
import { createSelector } from "reselect"
import { withCollapsible } from "react-navigation-collapsible"
import { Animated, FlatList, Text, TouchableOpacity } from "react-native"
import SearchHeader from "../../components/search-header"

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

export interface IMoviesScreenProps extends NavigationScreenProps<{
  searchText?: string
}> {
  collapsible: { paddingHeight: number, animatedY: number, onScroll: () => void }
}

const data = []
for (let i = 0; i < 60; i++) {
  data.push(i.toString())
}

class MoviesScreen extends React.Component<IMoviesScreenProps, {
  fetching: boolean,
  error?: string,
  data?: any
}> {

  public state = {
    fetching: false,
    error: null,
    data,
  }


  public renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        this.props.navigation.navigate("DetailScreen")
      }}
      style={{
        width: "100%",
        height: 50,
        borderBottomColor: "#0002",
        borderBottomWidth: 0.5,
        paddingHorizontal: 20,
        justifyContent: "center",
      }}>
      <Text style={{ fontSize: 22 }}>{item}</Text>
    </TouchableOpacity>
  )

  public render() {
    const { paddingHeight, animatedY, onScroll } = this.props.collapsible
    const { searchText } = this.props.navigation.state.params ? this.props.navigation.state.params : { searchText: null }
    const data = searchText
      ? this.state.data.filter(item => item.includes(searchText))
      : this.state.data

    return (
      <AnimatedFlatList
        style={{ flex: 1 }}
        data={data}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => String(index)}
        contentContainerStyle={{ paddingTop: paddingHeight }}
        scrollIndicatorInsets={{ top: paddingHeight }}
        onScroll={onScroll}
        _mustAddThis={animatedY}
      />
    )
  }
}

const fetchingFnc = (state) => state.movies.moviesLoginFetching
const errorFnc = (state) => state.movies.loginError


const mapFnc = createSelector(
  [
    fetchingFnc,
    errorFnc,
  ], (fetching, error) => {
    return {
      fetching,
      error,
    }
  })

const mapStateToProps = (state) => {
  return mapFnc(state)
}
const mapDispatchToProps = (dispatch) => {
  return {
    //   requestMoviesLogin: () => dispatch(MoviesActions.requestMoviesLogin({
    //     provider: "email",
    //     email: "khan@fingi.com",
    //     password: "2vergeten2",
    //   })),
    // }
  }
}

const collapsibleParams = {
  collapsibleComponent: SearchHeader,
  collapsibleBackgroundStyle: {
    height: 60,
    // disableFadeoutInnerComponent: true,
  },
}

const collapsibleMoviesScreen = withCollapsible(MoviesScreen, collapsibleParams)

export default connect(mapStateToProps, mapDispatchToProps)(collapsibleMoviesScreen)



