import React from "react"
import { TextInput, View } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"


const SearchHeader = ({ navigation, collapsible }) => {
  // @ts-ignore
  const { searchText } = navigation.state.params ? navigation.state.params : {}
  return (
    <View
      style={styles.container}>
      <View
        style={{
          backgroundColor: "white",
          flex: 1,
          borderRadius: 10,
          margin: 10,
          justifyContent: "center",
        }}>
        <TextInput
          style={{ paddingHorizontal: 20 }}
          placeholder="Search Movies"
          value={searchText}
          onChangeText={text => navigation.setParams({ searchText: text })}
        />
      </View>
    </View>
  )
}

const styles =  EStyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 75,
    justifyContent: "center",
    backgroundColor: "green"
  },


})

export default SearchHeader
