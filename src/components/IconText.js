import React from 'react';
import { TouchableOpacity } from 'react-native';
import Row from './Row';

const IconText = ({ icon, text, containerStyle, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Row style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5, ...containerStyle}}>
      {icon}
      {text}
      </Row>
      </TouchableOpacity>
  )

export default IconText