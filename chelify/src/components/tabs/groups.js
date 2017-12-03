import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../styles/style.js'
import { Text, View, TouchableNativeFeedback, Image } from 'react-native'
import { StackNavigator, NavigationActions } from 'react-navigation';
import ActionButton from 'react-native-action-button'
export class Groups extends React.Component {
    static navigationOptions = {
        title: 'Grupos',
        headerStyle: { backgroundColor: '#2C2F33' },
        headerTitleStyle: { color: '#FFF', fontWeight: '200', fontFamily: 'Circular' },
        tabBarIcon: ({ tintColor }) => (
            <Icon name="users" size={15} color="#FFF" />
        )
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', paddingHorizontal: 15 }}>
                <TouchableNativeFeedback
                >
                    <Image
                        style={{ width: 128, height: 128 }}
                        source={require('../../../assets/img/welcome/screen4.png')}
                    />
                </TouchableNativeFeedback>
                <Text style={{ fontFamily: 'Circular', fontSize: 20, textAlign: 'center', marginTop: 10 }}>No eres miembro de ningún grupo todavía</Text>
            </View>
            <ActionButton
                buttonColor="#24E189"
                onPress={() => this.props.navigation.navigate('Add', {onSuccess: () => this.update()})}
            />
        </View>
        );
    }
}

const GroupsStack = StackNavigator({
    Groups: {
        screen: Groups
    }
})

export default GroupsStack;