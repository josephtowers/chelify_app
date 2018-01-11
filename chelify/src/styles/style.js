import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
        header:
            {
                backgroundColor: '#2C2F33',
            },
        headerText: {
            color: '#FFF',
            fontFamily: 'Circular'
        },
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#2C2F33',
            width: Dimensions.get('window').width
        },
        points: {
            backgroundColor: 'transparent',
            position: 'absolute',
        flexDirection: 'row',
            top: 41,
            left: 32,
            fontFamily: 'Circular',
            width: 52,
            textAlign: 'center',
            color: '#24E189',
            fontSize: 20,
            fontWeight: "100"
          },
        buttonsContainer: {
            alignSelf: 'stretch',
            flexDirection: "row",
            marginTop: 20,
            alignContent: 'center',
            justifyContent: 'space-around',
            paddingHorizontal: 35
        },
        welcome: {
            fontSize: 20,
            textAlign: 'center',
            margin: 10,
            color: '#FFFFFF',
            fontFamily: 'Circular'
        },
        instructions: {
            textAlign: 'center',
            color: '#FFFFFF',
            marginBottom: 5,
        },
        chart: {
            width: 200,
            height: 200,
        },
        inputs: {
            alignSelf: 'stretch',
            color: '#FFFFFF',
            borderColor: '#FFFFFF',
            fontFamily: 'Circular'
        },
        buttons: {
            fontFamily: 'Circular'
        },
        wrapper: {
        },
        slide: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFF',
            paddingHorizontal: 32
        },
        text: {
            color: '#000',
            fontSize: 30,
            fontWeight: 'bold',
            marginTop: 20,
            fontFamily: 'Circular',
            textAlign: 'center'
        },
        textLink: {
            color: '#078B75',
            fontSize: 14,
            fontWeight: '400'
        },
        centralizedTitle: {
            color: '#000',
            fontSize: 30,
            fontWeight: 'bold',
            marginTop: 20,
            textAlign: 'center'
        },
        circleText: {
            fontSize: 20,
            color: 'white'
        },
        circleSubtext: {
            fontSize: 10,
            color: 'white'
        },
        centralizedParagraph: {
            color: '#95989A',
            fontSize: 19,
            textAlign: 'center',
            padding: 15,
            lineHeight: 30,
            marginTop: 20
        },
        ptext: {
            fontSize: 18,
            marginTop: 16,
            fontFamily: 'Circular',
            textAlign: 'center'
        },
        circle: {
            width: 70,
            height: 70,
            borderRadius: 70 / 2,
            marginHorizontal: 10,
            marginVertical: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: 'white'
        },
        circleBlank: {
            width: 70,
            height: 50,
            borderRadius: 70 / 2,
            marginHorizontal: 10,
            marginVertical: 5,
            justifyContent: 'center',
            alignItems: 'center'
        },
        circleSmall: {
            width: 16,
            height: 16,
            borderRadius: 16 / 2,
            marginHorizontal: 10,
            marginVertical: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: 'white'
        },
        circleMedium: {
            width: 30,
            height: 30,
            borderRadius: 30 / 2,
            marginHorizontal: 10,
            marginVertical: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: 'white'
        },
        chart: {
            width: Dimensions.get('window').width - 30,
            height: 200,
            marginBottom: 20
        },
        chartContainer: {
            flex: 1,
            justifyContent: 'center',
            alignSelf: 'stretch',
            alignItems: 'center',
            backgroundColor: 'white',
        },
        font:
            {
                fontFamily: 'Circular'
            },
        modalBox: {
            backgroundColor: "white",
            paddingHorizontal: 20,
            paddingVertical: 16
        },
        modalBoxBg: {
            backgroundColor: "rgba(52, 52, 52, 0.75)",
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
        }
    });

export default styles;    