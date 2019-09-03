import * as React from "react"
import { Text, View } from "react-native"
import { NavigationScreenProps } from "react-navigation"

export interface IAccountDetailScreenProps extends NavigationScreenProps<{}> {
}


export class AccountDetailScreen extends React.Component<IAccountDetailScreenProps, {}> {
  public render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Account Detail Screen</Text>
      </View>
    )
  }
}
