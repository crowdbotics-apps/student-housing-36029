import * as React from "react"
import Svg, { Path } from "react-native-svg"

const Balcony = (props) => (
  <Svg
    {...props}
    width={16}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M5.96 7.413V9.08H4.292V7.413h1.666Zm5 1.667V7.413H9.292V9.08h1.666Zm4.166 1.666v6.667h-15v-6.667h.833V7.413A6.665 6.665 0 0 1 7.626.746a6.665 6.665 0 0 1 6.667 6.667v3.333h.833ZM3.459 12.413H1.793v3.333h1.666v-3.333Zm3.334 0H5.126v3.333h1.667v-3.333Zm0-9.933a5.007 5.007 0 0 0-4.167 4.933v3.333h4.167V2.48Zm1.666 8.266h4.167V7.413c0-2.475-1.8-4.533-4.167-4.933v8.266Zm1.667 1.667H8.459v3.333h1.667v-3.333Zm3.333 0h-1.666v3.333h1.666v-3.333Z"
      fill="#4797AF"
    />
  </Svg>
)

export default Balcony
