import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

const Elevator = (props) => (
  <Svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 247.835 247.835"
    style={{
      enableBackground: "new 0 0 247.835 247.835",
    }}
    xmlSpace="preserve"
  >
    <G fill="#EE7950">
      <Path d="M124.119 32.025a7.17 7.17 0 0 0-6.208 3.584L83.515 95.22a7.141 7.141 0 0 0 0 7.168 7.171 7.171 0 0 0 6.209 3.584H158.5a7.174 7.174 0 0 0 6.212-3.584 7.15 7.15 0 0 0 0-7.168l-34.387-59.61a7.167 7.167 0 0 0-6.206-3.585zm-21.98 59.611 21.98-38.095 21.978 38.095h-43.958zM158.5 141.594H89.724a7.172 7.172 0 0 0-6.209 3.585 7.141 7.141 0 0 0 0 7.168l34.392 59.613a7.168 7.168 0 0 0 12.414 0l34.387-59.613a7.15 7.15 0 0 0 0-7.168 7.16 7.16 0 0 0-6.208-3.585zm-34.381 52.435-21.984-38.097h43.962l-21.978 38.097zM158.5 116.562H89.724a7.17 7.17 0 0 0 0 14.339H158.5a7.17 7.17 0 0 0 7.169-7.17 7.168 7.168 0 0 0-7.169-7.169z" />
      <Path d="M84.332 0C67.969 0 54.658 13.315 54.658 29.678v188.479c0 16.363 13.311 29.678 29.673 29.678h79.163c16.367 0 29.683-13.314 29.683-29.678V29.678C193.177 13.315 179.862 0 163.495 0H84.332zm94.512 29.678v188.479c0 8.457-6.884 15.341-15.34 15.341H84.332c-8.459 0-15.336-6.884-15.336-15.341V29.678c0-8.457 6.877-15.341 15.336-15.341h79.163c8.461 0 15.349 6.884 15.349 15.341z" />
    </G>
  </Svg>
)

export default Elevator
