import * as React from "react"
import Svg, { Path } from "react-native-svg"

const PrivateBathroom = (props) => (
  <Svg
    {...props}
    width={18}
    height={19}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M14.346 11.166a7.912 7.912 0 0 1-.99.828L12.6 10.68V8.43h.9v-.9H8.442l-1.557-2.7H3.6l.9.684L3.15 7.08l.855.9L5.4 7.089v3.59l-.756 1.315a7.207 7.207 0 0 1-.99-.828l-.954.954A8.858 8.858 0 0 0 9 14.73a8.858 8.858 0 0 0 6.3-2.61l-.954-.954Zm-8.541 1.503.027-.054.729-1.27a6.949 6.949 0 0 0 4.86 0l.729 1.27.027.054a7.57 7.57 0 0 1-3.195.71 7.357 7.357 0 0 1-3.177-.71ZM16.2 2.129v14.4H1.8V2.13h14.4Zm0-1.8H1.8C.81.33 0 1.14 0 2.13v14.4c0 .99.81 1.8 1.8 1.8h14.4c.99 0 1.8-.81 1.8-1.8V2.13c0-.99-.81-1.8-1.8-1.8Z"
      fill="#4797AF"
    />
  </Svg>
)

export default PrivateBathroom
