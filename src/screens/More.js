import * as React from 'react';
import PropTypes from 'prop-types';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, gStyle } from '../constants';

// components
// import Cast from '../components/Cast';
import HeaderAccounts from '../components/HeaderAccounts';
import TouchLineItem from '../components/TouchLineItem';

// // icons
import SvgBell from '../icons/Svg.Bell';
import SvgCheck from '../icons/Svg.Check';

// full :: https://help.netflix.com/legal/privacy?headless=true&locale=en-US
const privacyUrl = 'https://help.netflix.com/legal/privacy?headless=true';

const alertSignOut = () => {
    Alert.alert(
        'Encerrar sessão',
        'Tem certeza de que deseja sair?',
        [{ text: 'Não' }, { text: 'Sim' }],
        { cancelable: false }
    );
};

function More({ navigation }) {
    return (
        <View style={gStyle.container}>
            <HeaderAccounts />
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchLineItem
                    icon={<SvgBell />}
                    onPress={() => navigation.navigate('MoreNotifications')}
                    showBorder
                    text="Notificações"
                />
                <TouchLineItem
                    icon={<SvgCheck />}
                    onPress={() => navigation.navigate('MoreMyList')}
                    showBorder
                    text="Minha lista"
                />
                <TouchLineItem
                    onPress={() => navigation.navigate('MoreAppSettings')}
                    showArrow={false}
                    showBorder
                    text="Configurações do aplicativo"
                />
                <TouchLineItem
                    onPress={() => navigation.navigate('ModalWebView', { url: privacyUrl })}
                    showArrow={false}
                    text="Termos"
                />
                <TouchLineItem onPress={() => null} showArrow={false} text="Ajuda" />
                <TouchLineItem
                    onPress={() => alertSignOut()}
                    showArrow={false}
                    text="Encerrar sessão"
                />
            </ScrollView>
            <Text style={styles.versionText}>
                {`Versão: 1.12.5`}
            </Text>
        </View>
    );
}

More.propTypes = {
    // required
    navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
    versionText: {
        position: 'absolute',
        color: colors.moreVersionText,
        fontFamily: fonts.regular,
        fontSize: 18,
        bottom: 10,
        right: 10
    }
});

export default More;
