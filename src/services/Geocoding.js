import Geocoder from '@timwangdev/react-native-geocoder';
import { MAPS_API_KEY } from '../constants/Constants';

export const GeocodeAddress = async (address, callback) => {
    try {
        const result = await Geocoder.geocodeAddress(address, {
          apiKey: MAPS_API_KEY,
          locale: 'en',
          maxResults: 1,
          forceGoogleOnIos: true,
          fallbackToGoogle: true
        });
        // console.log('GeocodePlace result: ', result);
        callback(result.length>0 ? result[0].position : null);
      } catch(err) {
        console.log('GeocodePlace err: ', err)
      }
      
 }
export const GeocodePosition = async ({lat,lng}, callback) => {
    try {
        const result = await Geocoder.geocodePosition({lat,lng}, {
          apiKey: MAPS_API_KEY,
          locale: 'en',
          maxResults: 1,
          forceGoogleOnIos: true,
          fallbackToGoogle: true
        });
        console.log('GeocodePosition result: ', result);
        callback(result.length>0 ? result[0].locality : null);
      } catch(err) {
        console.log('GeocodePlace err: ', err)
        callback(null)
      }
      
 }
