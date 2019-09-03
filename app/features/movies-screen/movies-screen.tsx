import * as React from "react"
import { View } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import styles from "./styles/login-options-screen-style"
import { Card } from "react-native-paper"
import { connect } from "react-redux"
import { createSelector } from "reselect"

export interface IMoviesScreenProps extends NavigationScreenProps<{}> {
  // requestMoviesLogin: () => void
}


class MoviesScreen extends React.Component<IMoviesScreenProps, {
  fetching: boolean,
  error?: string,
  data?: any
}> {

  public state = {
    fetching: false,
    error: null,
  }

  public render() {
    return (
      <View style={styles.container}>
        <Card>

        </Card>
      </View>
    )
  }

  private handleFacebookClick = () => {
    console.log(this.state)
  }

  private handleLineClick = () => {
    console.log(this.state)
  }

  private handleEmailClick = () => {

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

export default connect(mapStateToProps, mapDispatchToProps)(MoviesScreen)


