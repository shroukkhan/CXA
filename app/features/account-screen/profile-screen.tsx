import * as React from "react"
import { Text, View } from "react-native"
import { NavigationScreenProps } from "react-navigation"

export interface IProfileScreenProps extends NavigationScreenProps<{}> {
}


export class ProfileScreen extends React.Component<IProfileScreenProps, {}> {
  public render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Profile Screen</Text>
      </View>
    )
  }
}
