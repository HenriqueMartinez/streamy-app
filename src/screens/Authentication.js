import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Image } from 'expo-image';
import { Asset } from 'expo-asset';

import { useAuthContext } from '../contexts/AuthContext';
import { api } from '../constants';

import { colors } from '../constants';

function Authentication() {
    const { setUser } = useAuthContext();

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [loginProcess, setLoginProcess] = useState(false);

    const handleNameChange = (input) => {
        const cleanedInput = input.replace(/[^\w]/g, '');
        setName(cleanedInput);
    };

    const logo = Asset.fromModule(require('../assets/icon.png')).uri;

    const handleLogin = async () => {
        if (name === '' || password === '') return;
        try {
            setLoginProcess(true);

            const response = await api.get('/api/streamy/authenticationv2', {
                params: {
                    name,
                    password,
                },
            });

            if (response.data.state) {
                setUser(response.data.account);
            } else {
                // console.log(response.data.error)
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        } finally {
            setLoginProcess(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={[styles.container]}>
                <Image
                    source={{
                        uri: logo,
                    }}
                    contentFit='cover'
                    transition={600}
                    style={[
                        styles.logo,
                    ]}
                />
                <TextInput
                    autoCapitalize='none'
                    keyboardAppearance='dark'
                    placeholder='Nome de usuário'
                    placeholderTextColor={colors.moreSectionText}
                    onChangeText={handleNameChange}
                    selectionColor={colors.brandPrimary}
                    style={styles.input}
                    value={name}
                />
                <TextInput
                    autoCapitalize='none'
                    keyboardAppearance='dark'
                    placeholder='Senha'
                    placeholderTextColor={colors.moreSectionText}
                    onChangeText={(input) => setPassword(input)}
                    secureTextEntry
                    selectionColor={colors.brandPrimary}
                    style={styles.input}
                    value={password}
                />

                <TouchableOpacity
                    onPress={() => {
                        if (!loginProcess) {
                            handleLogin();
                        }
                    }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Acessar conta</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.black
    },
    input: {
        borderColor: colors.white,
        borderWidth: 1,
        color: colors.white,
        fontSize: 16,
        paddingHorizontal: 8,
        paddingVertical: 12,
        marginBottom: 5,
        width: '75%',
        bottom: 40,
    },
    logo: {
        height: 120,
        resizeMode: 'cover',
        width: 120,
        bottom: 50,
    },
    button: {
        backgroundColor: colors.brandPrimary,
        padding: 10,
        borderRadius: 5,
        bottom: 20
    },
    buttonText: {
        color: colors.white,
        fontWeight: 'bold',
    },
});

export default Authentication;
