
import { ToastAndroid,Platform } from 'react-native';

const RNToast = {
    showShort: (text) => { Platform.OS==='android' && ToastAndroid.showWithGravity(text, ToastAndroid.SHORT, ToastAndroid.BOTTOM) },
    showLong: (text) => { Platform.OS==='android' && ToastAndroid.showWithGravity(text, ToastAndroid.LONG, ToastAndroid.BOTTOM) },
}

export default RNToast;