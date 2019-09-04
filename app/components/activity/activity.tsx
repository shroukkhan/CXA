import * as React from "react"
import { ActivityIndicator } from "react-native-paper"
import { ViewStyle } from "react-native"
import * as R from "ramda"
import EStyleSheet from "react-native-extended-stylesheet"


// tslint:disable-next-line
export interface IActivityIndicatorProps extends ViewStyle {
  show: boolean
  style?: ViewStyle
}


const Activity = (props: IActivityIndicatorProps) => {

  const { show, style, ...rest } = props
  let extraStyle: ViewStyle = {
    position: "absolute",
    alignSelf: "center",
    top: "40%",
  }

  extraStyle = R.merge(extraStyle, style)
  const s = EStyleSheet.create({
    extraStyle,
  })

  return (
    <ActivityIndicator size={"large"} hidesWhenStopped animating={!!show} style={s.extraStyle} {...rest} />
  )
}

export default Activity
