import React from 'react';
import { Text } from 'react-native';
import Colors from '../constants/Colors';

const LatoText = (props) => {
  
    const { style, children, bold, light, black, fontSize, color, ...textProps } = props; 

    let fontName = 'Lato-Regular';
    if(light) fontName = 'Lato-Light';
    if(bold) fontName = 'Lato-Bold';
    if(black) fontName = 'Lato-Black';
    
    return (
            <Text style = {
                {
                    fontFamily: fontName,
                    color: color || Colors.text,
                    fontSize,
                    flexWrap: 'wrap',
                    ...style,
                
                }
            } {...textProps}>
                {children}
            </Text>
    )
}

export default LatoText;