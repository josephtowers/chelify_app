import {ToastAndroid} from 'react-native';
export const users = [
    {
        name: "Anastasia Martinez",
        email: "anamartinez@gmail.com",
        password: "8095912565",
        image: {uri: 'https://randomuser.me/api/portraits/women/9.jpg'}
    },
    {
        name: "Roberto Mercedes",
        email: "robmercedes@gmail.com",
        password: "8095912565",
        image: {uri: 'https://randomuser.me/api/portraits/men/36.jpg'}
    },
    {
        name: "Vivian Gonzalez",
        email: "vivigon123@gmail.com",
        password: "8095912565",
        image: {uri: 'https://randomuser.me/api/portraits/women/46.jpg'}
    },
    {
        name: "Erika Lantigua",
        email: "erikaaa15@gmail.com",
        password: "8095912565",
        image: {uri: 'https://randomuser.me/api/portraits/women/32.jpg'}
    },
    {
        name: "Najeet Parrish",
        email: "najeetparrish@gmail.com",
        password: "8095912565",
        image: {uri: 'https://randomuser.me/api/portraits/men/39.jpg'}
    },
    {
        name: "Ernesto Montes de Oca",
        email: "emdo.2017@gmail.com",
        password: "8095912565",
        image: {uri: 'https://randomuser.me/api/portraits/men/35.jpg'}
    },
    {
        name: "Elmo Reno",
        email: "elmovicente1979@hotmail.com",
        password: "8095912565",
        image: {uri: 'https://randomuser.me/api/portraits/men/53.jpg'}
    }
];

const baseUrl = 'http://chelify.com';
const loginApi = baseUrl + '/auth/login';

export function login(email, password) {
    let a = fetch(loginApi, {
        method: 'POST',
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        // },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    })//.then(checkStatus)
        .then(response => response.json())
        .then((responseJson) => {
            console.log(responseJson);
        })
        .catch(e => e);
    console.log(a);
}

export function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export default users;
