import React from "react"
import { TouchableOpacity, View } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"
import { Text, TextInput } from "react-native-paper"
import { color } from "../../theme/index"

export const SEARCH_STATE = {
  TOP: "Top Movies",
  POPULAR: "Popular Movies",
  SEARCH: "Search",
}


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
  const  searchMode  = navigation.state.params && navigation.state.params.searchMode ? navigation.state.params.searchMode : SEARCH_STATE.TOP


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
          {Object.keys(SEARCH_STATE).map((key) => <TabBarButton navigation={navigation} type={SEARCH_STATE[key]}
                                                                key={SEARCH_STATE[key]}
                                                                selected={searchMode === SEARCH_STATE[key]}
                                                                text={SEARCH_STATE[key]}/>)}
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
