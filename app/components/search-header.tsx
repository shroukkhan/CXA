import React from "react"
import { TouchableOpacity, View } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"
import { Text, TextInput } from "react-native-paper"
import { color } from "../theme"


const TabBarButton = ({ text, selected, type, navigation }) => {
  return (
    <TouchableOpacity activeOpacity={1}
                      onPress={() => navigation.setParams({ searchMode: type })}
                      style={[styles.button, { backgroundColor: selected ? color.primary : color.background }]}>
      <Text style={{ color: selected ? color.background : undefined }}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}

const SearchHeader = ({ navigation, collapsible }) => {
  // @ts-ignore
  const { searchText } = navigation.state.params ? navigation.state.params : {}
  // @ts-ignore
  const { searchMode } = navigation.state.params ? navigation.state.params : {}
  return (
    <View
      style={styles.container}>
      <View style={styles.internalContainer}>
        <TextInput
          style={styles.textInputStyle}
          label="Search Movies"
          value={searchText}
          onChangeText={text => navigation.setParams({ searchText: text })}
        />
        <View style={styles.buttonContainer}>
          <TabBarButton navigation={navigation} type={"top"} key={"top"} selected={searchMode === "top"}
                        text={"Top Movies"}/>
          <TabBarButton navigation={navigation} type={"popular"} key={"popular"} selected={searchMode === "popular"}
                        text={"Popular Movies"}/>
          <TabBarButton navigation={navigation} type={"search"} key={"search"} selected={searchMode === "search"}
                        text={"Search"}/>
        </View>
      </View>
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    height: 120,
    justifyContent: "center",
    backgroundColor: color.background,
    borderBottomWidth: 0.75,
    borderBottomColor: color.charcoal,
  },
  internalContainer: {
    // backgroundColor:color.background,
    // shadowOffset: { width: 0, height: 2 },
    // shadowColor: "black",
    // shadowOpacity: 0.5,
    // height:100

  },
  buttonContainer: {
    backgroundColor: color.background,
    width: "100%",
    height: 50,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: color.background,
    width: "30%",
    borderColor: color.charcoal,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    // padding: 15,
    height: 35,
    marginRight: 5,
  },
  textInputStyle: {
    backgroundColor: color.background,
    margin: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginHorizontal: 15,
  },

})

export default SearchHeader
