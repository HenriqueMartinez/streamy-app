import { useState } from 'react';
import { Alert, Image, StyleSheet, Switch, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { colors, fonts, gStyle, images } from '../constants';

// components
import HeaderManage from "../components/HeaderManage"

function ModalAddProfile() {
    // local state
    const [isForKids, setForKids] = useState(false);
    const [text, setText] = useState('');

    const handleSwitchChange = (value) => {
        // warn on switch off from kids settings...
        if (value === false) {
            Alert.alert(
                'This profile will now allow access to TV shows and movies of all maturity levels.',
                '',
                [{ text: 'OK' }],
                { cancelable: false }
            );
        }

        setForKids(value);
    };

    return (
        <View style={[gStyle.container, { backgroundColor: colors.black }]}>
            <HeaderManage
                backText="Cancelar"
                save={text !== ''}
                saveActive={text !== ''}
                title="Criar novo perfil"
            />

            <View style={styles.container}>
                <Image source={images.penguin} style={styles.avatar} />
                {/* <Text style={styles.text}>ALTERAR</Text> */}
                <TouchableOpacity
                    activeOpacity={gStyle.activeOpacity}
                    // onPress={() => navigation.goBack(null)}
                    // style={styles.save}
                >
                    <Text style={styles.text}>Alterar imagem</Text>
                </TouchableOpacity>

                <TextInput
                    autoCapitalize="none"
                    autoFocus
                    keyboardAppearance="dark"
                    onChangeText={(input) => setText(input)}
                    selectionColor={colors.brandPrimary}
                    style={styles.input}
                    value={text}
                />

                {/* <View style={styles.containerSwitch}>
                    <Text style={styles.switchLabel}>PARA CRIANÇAS</Text>
                    <Switch onValueChange={handleSwitchChange} value={isForKids} />
                </View> */}
            </View>
        </View>
    );
}

const BLOCK_SIZE = 108;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: 16,
        paddingVertical: 60
    },
    avatar: {
        height: BLOCK_SIZE,
        resizeMode: 'contain',
        width: BLOCK_SIZE
    },
    text: {
        color: colors.white,
        fontFamily: fonts.regular,
        fontSize: 16,
        marginBottom: 24,
        marginTop: 8,
        textAlign: 'center'
    },
    input: {
        borderColor: colors.white,
        borderWidth: 1,
        color: colors.white,
        fontSize: 16,
        paddingHorizontal: 8,
        paddingVertical: 12,
        width: 260
    },
    containerSwitch: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 16
    },
    switchLabel: {
        color: colors.white,
        fontFamily: fonts.light,
        fontSize: 16,
        marginRight: 8,
        textTransform: 'uppercase'
    }
});

export default ModalAddProfile;
