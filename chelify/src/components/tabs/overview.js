import React, { Component } from 'react';
import { StackNavigator, NavigationActions } from 'react-navigation';
import {
    View,
    ScrollView,
    Image,
    Text,
    ToastAndroid,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native'
import {
    List,
    ListItem
} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../styles/style.js'
var ImagePicker = require('react-native-image-picker');

const assets = [
    {
        name: "Efectivo",
        amount: "RD$100.00"
    },
    {
        name: "Cuentas de ahorro",
        amount: "RD$8,900.00"
    },
    {
        name: "Cuentas corrientes",
        amount: "RD$19,000.00"
    }

]
const debts = [
    {
        name: "Tarjetas de crédito",
        amount: "RD$3,500.00"
    },
    {
        name: "Préstamo",
        amount: "RD$7,000.00"
    },
    {
        name: "Otros",
        amount: "RD$800.00"
    }

]

const capital = [
    {
        name: "Total",
        amount: "RD$16,700"
    }

]

export class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: require('../../../assets/img/add-picture.jpg')
        }
    }
    static navigationOptions = {
        title: 'Dashboard',
        headerStyle: { backgroundColor: '#2C2F33' },
        headerTitleStyle: { color: '#FFF', fontWeight: '200', fontFamily: 'Circular' },
        tabBarIcon: ({ tintColor }) => (
            <Icon name="home" size={15} color="#FFF" />
        ),
    }
    options = {
        title: 'Seleccionar foto de perfil',
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
      };

      selectImage() {
        ImagePicker.showImagePicker(this.options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            }
            else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            }
            else {
              let source = { uri: response.uri };
          
              // You can also display the image using data:
              // let source = { uri: 'data:image/jpeg;base64,' + response.data };
          
              this.setState({
                avatarSource: source
              });
            }
          });
      }
    render() {
        return (
            <ScrollView contentContainerStyle={{ alignItems: 'center', alignSelf: 'stretch', backgroundColor: '#FFF' }}>
                <View style={{ height: 120, backgroundColor: '#999', alignSelf: 'stretch', alignItems: 'center' }}>

                </View>
                <View style={{ bottom: 70, backgroundColor: 'transparent', alignSelf: 'stretch', alignItems: 'center' }}>
                <TouchableNativeFeedback onPress={() => this.selectImage()}>     
                <Image
                        style={{ width: 140, height: 140, borderRadius: 140 / 2 }}
                        resizeMode='cover'
                        source={this.state.avatarSource}
                        
                    />
                    </TouchableNativeFeedback>
                    <Text style={[{ color: '#000', fontSize: 20 }, styles.font]}>Jane Doe</Text>
                    <View>
                        <View style={{ alignSelf: 'stretch', alignItems: 'flex-start' }}>
                            <Text style={{ marginLeft: 20, fontSize: 18, fontFamily: 'Circular' }}>Resumen del mes de Octubre</Text>
                        </View>
                    </View>
                    <View style={{ alignSelf: 'stretch', alignItems: 'flex-start' }}>
                        <Text style={{ marginLeft: 20, fontSize: 18, fontFamily: 'Circular' }}>Activos</Text>
                    </View>
                    <List containerStyle={{ marginBottom: 20, alignSelf: 'stretch' }}>
                        {
                            assets.map((l, i) => (
                                <ListItem
                                    key={i}
                                    title={l.name}
                                    hideChevron={true}
                                    fontFamily="Circular"
                                    rightTitle={l.amount}
                                    rightTitleStyle={{ fontFamily: 'Circular' }}
                                />
                            ))
                        }
                    </List>
                    <View style={{ alignSelf: 'stretch', alignItems: 'flex-start' }}>
                        <Text style={{ marginLeft: 20, fontSize: 18, fontFamily: 'Circular' }}>Pasivos</Text>
                    </View>
                    <List containerStyle={{ marginBottom: 20, alignSelf: 'stretch' }}>
                        {
                            debts.map((l, i) => (
                                <ListItem
                                    key={i}
                                    title={l.name}
                                    hideChevron={true}
                                    fontFamily="Circular"
                                    rightTitle={l.amount}
                                    rightTitleStyle={{ fontFamily: 'Circular' }}
                                />
                            ))
                        }
                    </List>
                    <View style={{ alignSelf: 'stretch', alignItems: 'flex-start' }}>
                        <Text style={{ marginLeft: 20, fontSize: 18, fontFamily: 'Circular' }}>Capital</Text>
                    </View>
                    <List containerStyle={{ marginBottom: 20, alignSelf: 'stretch' }}>
                        {
                            capital.map((l, i) => (
                                <ListItem
                                    key={i}
                                    title={l.name}
                                    hideChevron={true}
                                    fontFamily="Circular"
                                    rightTitle={l.amount}
                                    rightTitleStyle={{ fontFamily: 'Circular' }}
                                />
                            ))
                        }
                    </List>
                </View>
            </ScrollView>
        );
    }
}
export const OverviewStack = StackNavigator({
    Overview: {
        screen: Overview
    }
})
export default OverviewStack;