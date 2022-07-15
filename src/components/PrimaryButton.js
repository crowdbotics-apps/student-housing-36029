import React from 'react';
import { Button } from 'react-native-elements';
import Colors from '../constants/Colors';
import { rf } from '../constants/Constants';
import Icon from '../constants/Icon';

const PrimaryButton = ({ title, containerStyle, buttonStyle, titleStyle,  onPress, loading, iconRight, icon, disabled }) => (
        <Button
            title={title}
            type='solid'
            onPress={onPress}
            loading={loading}
            iconRight={true}
            icon={icon || <Icon.Ionicon name='arrow-forward' size={20} color='white' style={{ position: 'absolute', left: 16 }}/>}
            titleStyle={{ color: Colors.white, fontSize: rf(2), fontFamily: 'Lato-Bold', ...titleStyle }}
            buttonStyle={{ backgroundColor: Colors.secondaryColor, borderRadius: 6, ...buttonStyle,  }}
            containerStyle={{ width: buttonStyle.width, borderRadius: 6, ...containerStyle }}
            disabled={disabled}
            />  

    )

export default PrimaryButton;