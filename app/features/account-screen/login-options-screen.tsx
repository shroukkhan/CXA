import * as React from "react"
import { View } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import styles from "./styles/login-options-screen-style"
import { OkButton } from "../../components/ok-button"
import { Card } from "react-native-paper"
import AccountActions from "./account-redux"
import { connect } from "react-redux"
import { createSelector } from "reselect"

export interface ILoginOptionsScreenProps extends NavigationScreenProps<{}> {
  requestAccountLogin: () => void
}


class LoginOptionsScreen extends React.Component<ILoginOptionsScreenProps, {
  fetching: boolean,
  error?: string,
  data?:any
}> {

  public state = {
    fetching: false,
    error: null,
  }

  public render() {
    return (
      <View style={styles.container}>
        <Card>
          <OkButton label={"CONTINUE_WITH_FACEBOOK"} onPress={this.handleFacebookClick}/>
          <OkButton label={"CONTINUE_WITH_LINE"} onPress={this.handleLineClick}/>
          <OkButton label={"EMAIL_LOG_IN"} onPress={this.handleEmailClick}/>
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
    // this.props.navigation.navigate("EmailLoginScreen")
    this.props.requestAccountLogin()
  }
}

const fetchingFnc = (state) => state.account.accountLoginFetching
const errorFnc = (state) => state.account.loginError


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
    requestAccountLogin: () => dispatch(AccountActions.requestAccountLogin({
      provider: "email",
      email: "khan@fingi.com",
      password: "2vergeten2",
    })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginOptionsScreen)


