import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation'
import styles from '../styles/style.js'
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'

export class Passcode extends React.Component {
    static navigationOptions = {
        header: null,
    }
    static resetAction = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: 'Start' })
        ]
    })
    constructor(props) {
        super(props);
        this.state = {
            pass: '',
            colorOne: 'transparent',
            colorTwo: 'transparent',
            colorThree: 'transparent',
            colorFour: 'transparent'
        };
    }
    changePass(val) {
        this.setState({ pass: this.state.pass + val }, function(){
            
        if (this.state.pass.length > 0) {
            this.setState({ colorOne: 'white' })
        }
        if (this.state.pass.length > 1) {
            this.setState({ colorTwo: 'white' })
        }
        if (this.state.pass.length > 2) {
            this.setState({ colorThree: 'white' })
        }
        if (this.state.pass.length > 3) {
            this.setState({ colorFour: 'white' });
            this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Start' })
                ]
            }));
        }
        });


    }
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={{ width: 200, height: 100 }}
                    resizeMode='contain'
                    source={require('../../assets/img/logo.png')}
                />
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                    <View style={[styles.circleSmall, { backgroundColor: this.state.colorOne }]}>
                    </View>
                    <View style={[styles.circleSmall, { backgroundColor: this.state.colorTwo }]}>
                    </View>
                    <View style={[styles.circleSmall, { backgroundColor: this.state.colorThree }]}>
                    </View>
                    <View style={[styles.circleSmall, { backgroundColor: this.state.colorFour }]}>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.changePass('1')}>
                        <View style={styles.circle}>
                            <Text style={styles.circleText}>1</Text>
                            <Text style={{ color: 'transparent', fontSize: 10 }}>.</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.changePass('2')}>
                        <View style={styles.circle}>
                            <Text style={styles.circleText}>2</Text>
                            <Text style={styles.circleSubtext}>ABC</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.changePass('3')}>
                        <View style={styles.circle}>
                            <Text style={styles.circleText}>3</Text>
                            <Text style={styles.circleSubtext}>DEF</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.changePass('4')}>
                        <View style={styles.circle}>
                            <Text style={styles.circleText}>4</Text>
                            <Text style={styles.circleSubtext}>GHI</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.changePass('5')}>
                        <View style={styles.circle}>
                            <Text style={styles.circleText}>5</Text>
                            <Text style={styles.circleSubtext}>JKL</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.changePass('6')}>
                        <View style={styles.circle}>
                            <Text style={styles.circleText}>6</Text>
                            <Text style={styles.circleSubtext}>MNO</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.changePass('7')}>
                        <View style={styles.circle}>
                            <Text style={styles.circleText}>7</Text>
                            <Text style={styles.circleSubtext}>PQRS</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.changePass('8')}>
                        <View style={styles.circle}>
                            <Text style={styles.circleText}>8</Text>
                            <Text style={styles.circleSubtext}>TUV</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.changePass('9')}>
                        <View style={styles.circle}>
                            <Text style={styles.circleText}>9</Text>
                            <Text style={styles.circleSubtext}>WXYZ</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.changePass('0')}>
                        <View style={styles.circle}>
                            <Text style={styles.circleText}>0</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Passcode;