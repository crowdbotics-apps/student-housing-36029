import React, { Component } from 'react'
import { Text, View, Alert, Image, StyleSheet, Dimensions, Platform } from 'react-native';
import MapView, 
{ 
  Marker, 
  PROVIDER_GOOGLE,
  Polyline, 
}
from 'react-native-maps';


export default class GoogleMaps extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          camera: {
            center: props.center || { latitude: 0.0, longitude: 0.0 },
            pitch: props.pitch || 90,
            heading: props.heading || 0,
          
            // Only on iOS MapKit, in meters. The property is ignored by Google Maps.
            altitude: props.altitude || 100,
          
            // Only when using Google Maps.
            zoom: props.zoom || 15
        }
        };
      }

    static getDerivedStateFromProps(props, state) {
        console.log('getDerivedStateFromProps ----->', props, state);
        console.log('location changed >>>>>>>', props.center);  
        return {
          camera: {
            center: props.center || { latitude: 0.0, longitude: 0.0 },
            pitch: 90,
            heading: 0,
            altitude: 100,
            zoom: props.zoom || 15
          }
        };
        // Return null to indicate no change to state.
    }
  
    componentDidUpdate(prevProps, prevState) {
        if (this.state.camera.center.latitude !== prevState.camera.center.latitude) {
          this.map.animateCamera(this.state.camera, { duration: 3000 })
        }
        else if (this.state.camera.zoom !== prevState.camera.zoom) {
          this.map.animateCamera(this.state.camera, { duration: 3000 })
        }
    }

    renderMarker({key, id, isUser, markerCoords, title, description, image, imgSize, onPress, draggable }) {
     return (
      <Marker
        key={key}
        identifier={id}
        coordinate={markerCoords}
        title={title}
        description={description}
        onPress={onPress}
        draggable={false}
        />
         
    );
    }
  

    render() {
        return (
        <View style={[styles.container, this.props.mapContainer]}>
          <MapView
            ref={ref => { this.map = ref }}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            camera={this.state.camera}    
            scrollEnabled={true}
            zoomEnabled={true}
            pitchEnabled={true}
            rotateEnabled={true}
            showsUserLocation={true}
            followsUserLocation={false}
            showsMyLocationButton={false}
            showsCompass={false}
            onLayout={() => {
              this.map.animateCamera(this.state.camera, { duration: 3000 })
            }}
            onMapReady={() => { console.log('map is ready')}}
            >
              {this.props.markers.map(marker => this.renderMarker(marker))}

            </MapView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 400,
        width: '100%', 
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      map: {
        width: '100%', 
        height: '100%'
      },
     });
