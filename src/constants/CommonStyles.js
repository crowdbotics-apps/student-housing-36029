import { StyleSheet } from "react-native";
import Colors from "./Colors";
import { hp, wp } from "./Constants";

const CommonStyles =  StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        height: 45,
        marginTop: 10,
        backgroundColor: 'transparent',
        elevation: 4,
        paddingHorizontal:0,
        borderRadius: 6

    },
    input2: {
        width: '95%',
        height: 79,
        marginTop: hp('3%'),
        borderWidth: 1,
        borderColor: '#919191'

    },
    input3: {
        width: '95%',
        height: hp('20%'),
        marginTop: hp('3%'),
        borderWidth: 1,
        borderColor: '#919191'

    },
    input4: {
        width: '95%',
        height: hp('30%'),
        marginTop: hp('3%'),
        borderWidth: 1,
        borderColor: '#919191'

    }
});

export default CommonStyles