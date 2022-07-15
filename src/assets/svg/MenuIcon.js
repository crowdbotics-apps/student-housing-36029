import * as React from "react"
import Svg, { Path } from "react-native-svg"

const MenuIcon = (props) => (
  <Svg
    {...props}
    width={26}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M5.109 18.754h6.25v-2h-6.25v2Zm0-12v2h18.75v-2H5.109Zm0 7h12.5v-2h-12.5v2Z"
      fill="#232F39"
    />
  </Svg>
)

export default MenuIcon
