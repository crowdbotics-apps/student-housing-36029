
import React, { useState, useEffect } from 'react'
import { StyleSheet,Platform, View } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import LatoText from './LatoText';
import Colors from '../constants/Colors';
import Row from './Row';
import { wp } from '../constants/Constants';

const SLIDER_LENGTH = wp('90%')-220; 

const styles = StyleSheet.create({
    viewContainer: {
        alignSelf: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
        width: SLIDER_LENGTH+120,
        height: 50
    },
    label: {
        width: 50,
        marginHorizontal: 10,
        textAlign:'center'
    }
});


const MultirangeSlider = ({initial,  min, max, onValuesChange, reset, defaults }) => {
  
    const [multiSliderValue, setMultiSliderValue] = useState([min, max])
    
    const multiSliderValuesChange = (values) => setMultiSliderValue(values)

    useEffect(() => {
      if(reset) setMultiSliderValue(defaults)
    }, [reset]);
    
  return (
    <Row style={styles.viewContainer}>
        <LatoText style={{...styles.label }}>${multiSliderValue[0]}</LatoText>
        <MultiSlider
            containerStyle={{ width: SLIDER_LENGTH, height: 30,}}
            markerStyle={{
                    height: 15,
                    width: 15,
                    borderRadius: 15,
                    backgroundColor: Colors.text
            }}
            pressedMarkerStyle={{
                height: 15,
                width: 15,
                borderRadius: 20,
                backgroundColor: Colors.text
            }}
            selectedStyle={{
                backgroundColor: Colors.text,
            }}
            trackStyle={{
                backgroundColor: '#aaa',
                height: 2
            }}
            touchDimensions={{
                height: 30,
                width: 30,
                borderRadius: 0,
                slipDisplacement: 5
            }}
            values={[multiSliderValue[0], multiSliderValue[1]]}
            sliderLength={SLIDER_LENGTH}
            onValuesChange={multiSliderValuesChange}
            onValuesChangeFinish={onValuesChange}
            min={min}
            max={max}
            allowOverlap={false}
            minMarkerOverlapDistance={10}
        />
        <LatoText style={styles.label}>${multiSliderValue[1]}</LatoText>
    </Row>
  )
}

export default MultirangeSlider
