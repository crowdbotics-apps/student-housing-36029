import React from 'react';
import { Button } from 'react-native-elements';
import Colors from '../constants/Colors';

const SocialButton = ({ title, containerStyle, buttonStyle, titleStyle,  onPress, loading, iconRight, icon, component, disabled }) => (
        <Button
        title={title}
        type='outline'
        onPress={onPress}
        loading={loading}
        iconRight={iconRight}
        icon={icon}
        titleStyle={{ color: Colors.secondaryColor, fontSize: 24, fontFamily: 'Roboto-SemiBold', ...titleStyle }}
        buttonStyle={{ backgroundColor: Colors.white, borderColor: '#737373', borderWidth: 1,  ...buttonStyle }}
        containerStyle={{ width: buttonStyle.width, ...containerStyle }}
        TouchableComponent={component}
        disabled={disabled}
        />  
    )

export default SocialButton;