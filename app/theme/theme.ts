import fonts from "./typography"
import metrics from "./metrics"
import colors from "./color"
import { DefaultTheme } from "react-native-paper"
import EStyleSheet from "react-native-extended-stylesheet"

EStyleSheet.build({
  ...fonts.size,
  $roundness: 25, // border radius used by buttons


  /* Smartphones (portrait and landscape) ----------- */
  "@media (min-width : 320px) and (max-width : 480px) ": {},
  /* Smartphones (landscape) ----------- */
  "@media (min-width : 321px) ": {},

  /* Smartphones (portrait) ----------- */
  "@media (max-width : 320px) ": {},

  /* iPads (portrait and landscape) ----------- */
  "@media (min-width : 768px) and (max-width : 1024px) ": {},

  /* iPads (landscape) ----------- */
  "@media (min-width : 768px) and (max-width : 1024px) and (orientation : landscape) ": {},

  /* iPads (portrait) ----------- */
  "@media (min-width : 768px) and (max-width : 1024px) and (orientation : portrait) ": {
    $h1: "5rem",
    $h2: "3.4rem",
    $h3: "3rem",
    $h4: "2.8rem",
    $h5: "2.6rem",
    $h6: "2.4rem",
    $input: "1.5rem",
    $regular: "1.5rem",
    $medium: "1.6rem",
    $small: "1.4rem",
    $tiny: "1rem",
    $roundness: 35,
    $flag: 32,
    $sidebarWidthPercentage: 0.7,
  },

  /* iPhone 4 ----------- */
  "@media (min-width : 320px) and (max-width : 480px) and (orientation : landscape)": {},

  "@media (min-width : 320px) and (max-width : 480px) and (orientation : portrait)": {},

  /* iPhone 5 ----------- */
  "@media (min-width: 320px) and (max-height: 568px) and (orientation : landscape)": {},

  "@media (min-width: 320px) and (max-height: 568px) and (orientation : portrait)": {},

  /* iPhone 6, 7, 8 ----------- */
  "@media (min-width: 375px) and (max-height: 667px) and (orientation : landscape)": {},

  "@media (min-width: 375px) and (max-height: 667px) and (orientation : portrait)": {},

  /* iPhone 6+, 7+, 8+ ----------- */
  "@media (min-width: 414px) and (max-height: 736px) and (orientation : landscape)": {},

  "@media (min-width: 414px) and (max-height: 736px) and (orientation : portrait)": {},

  /* iPhone X ----------- */
  "@media (min-width: 375px) and (max-height: 812px) and (orientation : landscape)": {},

  "@media (min-width: 375px) and (max-height: 812px) and (orientation : portrait)": {},

  /* iPhone XS Max, XR ----------- */
  "@media (min-width: 414px) and (max-height: 896px) and (orientation : landscape)": {},

  "@media (min-width: 414px) and (max-height: 896px) and (orientation : portrait)": {
    $h1: "2.5rem",
    $h2: "2.2rem",
    $h3: "2rem",
    $h4: "1.8rem",
    $h5: "1.6rem",
    $h6: "1.4rem",
    $input: "1rem",
    $regular: "1.1rem",
    $mediumExtra: "0.9rem",
    $medium: "0.8rem",
    $small: "0.7rem",
    $tiny: "0.5rem",
  },

  /* Samsung Galaxy S3 / S4 ----------- */
  "@media (min-width: 320px) and (max-height: 640px) and (orientation : landscape)": {},

  "@media (min-width: 320px) and (max-height: 640px) and (orientation : portrait)": {},

  /* Samsung Galaxy S5 ----------- */
  "@media (min-width: 360px) and (max-height: 640px) and (orientation : landscape)": {},

  "@media (min-width: 360px) and (max-height: 640px) and (orientation : portrait)": {},

})
const ApplicationThemes = {
  ...DefaultTheme, // extend default theme
  roundness: EStyleSheet.value("$roundness"),
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
  },
  fonts: {
    ...DefaultTheme.fonts,
    ...fonts.type,
  },
  screen: {
    mainContainer: {
      width:"100%",
      height:"100%",
      backgroundColor: colors.transparent,
    },
    containerWithNavBarPadding: {
      flex: 1,
      height: "100%",
      width: "100%",
      paddingTop: metrics.navBarHeight,
      backgroundColor: colors.transparent,
    },
    error: {
      color: colors.error,
      fontSize: "$small",
      textAlign: "center",
      alignSelf: "center",
      padding: metrics.doubleBaseMargin,
    },
    center: {
      justifyContent: "center",
      alignItems: "center",
    },
    left: {
      justifyContent: "center",
      alignItems: "flex-start",
    },
    right: {
      justifyContent: "center",
      alignItems: "flex-end",
    },
  },
}

export default ApplicationThemes
