import { palette } from "./palette"

export const color = {
  background: "#fff",
  clear: "rgba(0,0,0,0)",
  facebook: "#3b5998",
  transparent: "rgba(0,0,0,0)",
  invisible: "rgba(0,0,0,.001)",
  silver: "#F7F7F7",
  steel: "#CCCCCC",
  error: "rgba(200, 0, 0, 0.8)",
  ricePaper: "rgba(255,255,255, 0.75)",
  frost: "#D8D8D8",
  cloud: "rgba(200,200,200, 0.35)",
  windowTint: "rgba(0, 0, 0, 0.4)",
  windowTintLight: "rgba(0, 0, 0, 0.2)",
  panther: "#161616",
  charcoal: "#595959",
  coal: "#2d2d2d",
  bloodOrange: "#fb5f26",
  snow: "white",
  ember: "rgba(164, 0, 48, 0.5)",
  fire: "#e73536",
  drawer: "rgba(30, 30, 29, 0.95)",
  borderBottomColor: "#ecf0f1",
  deepBlueSkyColor: "#1E90FF",
  /**
   * The palette is available to use, but prefer using the name.
   */
  ...palette,

}


export default color
