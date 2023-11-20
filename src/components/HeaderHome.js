import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, fonts, gStyle } from '../constants';

function HeaderHome({ navigation }) {
    return (
        <View style={styles.container}>

            <TouchableOpacity
                activeOpacity={gStyle.activeOpacity}
                onPress={() => navigation.navigate('MoviesAndTvshows', { type: 'movies', value: 'Filmes' })}
            >
                <Text style={styles.title}>Filmes</Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={gStyle.activeOpacity}
                onPress={() => navigation.navigate('MoviesAndTvshows', { type: 'tvshows', value: 'Séries' })}
            >
                <Text style={styles.title}>Séries</Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={gStyle.activeOpacity}
                onPress={() => navigation.navigate('ModalLiveTV', { type: 'movies', value: 'Filmes' })}
            >
                <Text style={styles.title}>Canais ao VIVO</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        alignItems: 'center',
        backgroundColor: colors.black40,
        width: '100%',
        height: '8%',
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 15
    },
    title: {
        color: colors.white,
        fontSize: 16,
        fontFamily: fonts.medium,
    }
});

export default HeaderHome;
