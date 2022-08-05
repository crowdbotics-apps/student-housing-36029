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
