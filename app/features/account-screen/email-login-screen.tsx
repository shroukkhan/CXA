import * as React from "react"
import { Text, View } from "react-native"
import { NavigationScreenProps } from "react-navigation"

export interface IEmailLoginScreenProps extends NavigationScreenProps<{}> {
}


export class EmailLoginScreen extends React.Component<IEmailLoginScreenProps, {}> {
  public render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Profile Screen</Text>
      </View>
    )
  }
}
