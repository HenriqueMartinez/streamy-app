import { Image } from 'expo-image';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, gStyle, tmdb, fonts } from '../constants';
import { useState } from 'react';

function MediaContent({ selectedMedia }) {
    const BASE_URL = tmdb.images.secure_base_url;
    const SIZE = tmdb.images.backdrop_sizes[2];

    const poster = `${BASE_URL}${SIZE}/`;

    return (
        <View style={styles.container}>
            <Image
                key={selectedMedia.id}
                source={{
                    uri: `${poster}${selectedMedia.backdrop_path}`,
                }}
                contentFit='cover'
                transition={600}
                style={[
                    styles.backgroundImage,
                ]}
            />

            <View style={styles.backgroundMask} />

            <View style={styles.informations}>
                <Text style={styles.infoTitle}>{selectedMedia.title ?? selectedMedia.name}</Text>
                <View style={styles.otherInfo}>
                    {/* <Text style={[styles.otherInfoTitle, { color: Number(selectedMedia.rating) > 5 ? '#86efac' : '#E5E5E5' }]}>Avaliação {selectedMedia.rating}</Text> */}
                    <Text style={[styles.otherInfoTitle, { color: '#86efac' }]}>Avaliação 5.1</Text>
                    <Text style={styles.otherInfoTitle}>Estreou em 1 de nov. de 2001</Text>
                    <Text style={styles.otherInfoTitle}>{selectedMedia.title ? 'Filme' : 'Série'}</Text>
                </View>
                <Text numberOfLines={4} style={styles.infoDescription}>{selectedMedia.overview}</Text>
                {/* <View style={styles.buttonArea}>

                </View> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },

    backgroundImage: {
        position: 'absolute',
        height: '100%',
        marginRight: 8,
        resizeMode: 'contain',
        width: '100%',
    },

    informations: {
        position: 'absolute',
        width: '100%',
        height: '65%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },

    infoTitle: {
        position: 'absolute',
        color: colors.white,
        fontSize: 30,
        fontFamily: fonts.medium,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        top: '15%',
        textAlign: 'center'
    },

    otherInfo: {
        position: 'absolute',
        top: '35%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
    },

    otherInfoTitle: {
        color: colors.white,
        fontSize: 16,
        // fontFamily: fonts.medium,
        // fontWeight: 'bold',
        // textTransform: 'uppercase',
        // top: '15%',
        textAlign: 'center'
    },

    infoDescription: {
        position: 'absolute',
        color: 'gray',
        width: '90%',
        fontSize: 16,
        // fontFamily: fonts.medium,
        // fontWeight: 'bold',
        top: '50%'
    },

    buttonArea: {
        position: 'absolute',
        width: '100%',
        height: '25%',
        bottom: 0,
        backgroundColor: 'red'
    },

    backgroundMask: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: colors.black50
    }
});

export default MediaContent;
