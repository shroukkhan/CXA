import React, { Component } from "react"
import { StatusBar } from "react-native"
import ReduxNavigation from "./services/navigation/redux-nagivation"
import { connect } from "react-redux"
import StartupActions from "./services/appstart/startup-redux"
import ReduxPersist from "./config/redux-persist"
import { Provider as PaperProvider } from "react-native-paper"
import ApplicationThemes from "./theme/theme"
import { SafeAreaView } from "react-navigation"
import { createSelector } from "reselect"

class RootContainer extends Component<{
  startup: () => void,
  startupComplete: boolean
}> {
  public componentDidMount() {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  public render() {
    return (
      <PaperProvider theme={ApplicationThemes}>
        <StatusBar barStyle="dark-content"/>
        <SafeAreaView style={ApplicationThemes.screen.mainContainer}>
          {this.props.startupComplete ? <ReduxNavigation/> : null}
        </SafeAreaView>
      </PaperProvider>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(StartupActions.startup()),
})

const startupCompleteFnc = (state) => !!state.startup.startupComplete
const mapFnc = createSelector(
  [
    startupCompleteFnc,
  ], (startupComplete) => {
    return {
      startupComplete,
    }
  })

const mapStateToProps = (state) => {
  return mapFnc(state)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootContainer)
