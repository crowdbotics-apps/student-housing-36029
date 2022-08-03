import * as React from "react"
import Svg, { Path } from "react-native-svg"

const Terrace = (props) => (
  <Svg
    {...props}
    width={17}
    height={17}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="m16.979 5.987-8-5.6-8 5.6h7.2v10.4h1.6v-10.4h7.2Zm-8-3.648 2.928 2.048H6.05L8.979 2.34Z"
      fill="#4797AF"
    />
    <Path
      d="m2.69 8.387-1.568.296.656 3.497v4.207h1.6l.016-3.2h1.584v3.2h1.6v-4.8h-3.28l-.608-3.2ZM14.659 11.588h-3.28v4.8h1.6v-3.2h1.584l.016 3.2h1.6v-4.209l.656-3.496-1.568-.296-.608 3.2Z"
      fill="#4797AF"
    />
  </Svg>
)

export default Terrace
