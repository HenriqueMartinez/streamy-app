import React from 'react';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { tmdb, colors, gStyle } from '../constants';

import Carousel from '../components/Carousel';
import MediaContent from '../components/MediaContent';
import HeaderHome from '../components/HeaderHome';

import { useMovieTVContext } from '../contexts/MovieTVData';

function Home({ navigation }) {
    const { trending } = useMovieTVContext();

    const [selectedMedia, setSelectedMedia] = useState({});

    const BASE_URL_IMAGE = tmdb.images.secure_base_url;
    const SIZE = tmdb.images.backdrop_sizes[2];
    const poster = `${BASE_URL_IMAGE}${SIZE}/`;

    useEffect(() => {
        if (trending.length > 0) {
            setSelectedMedia(trending[0])
        }
    }, [trending]);

    return (
        <View style={gStyle.container}>
            {trending.length === 0 ? (
                <ActivityIndicator size="large" color={colors.brandPrimary} style={{ flex: 1 }} />
            ) : (
                <>
                    <Image
                        source={{
                            uri: `${poster}${selectedMedia?.backdrop_path ?? selectedMedia.poster_path}`,
                        }}
                        contentFit='cover'
                        transition={600}
                        style={[
                            styles.backgroundImage,
                        ]}
                    />
                    <View style={styles.backgroundMask} />
                    <HeaderHome navigation={navigation} />
                    <View style={styles.contentContainer}>
                        <MediaContent navigation={navigation} selectedMedia={selectedMedia} />
                        <View style={styles.carouselContainer}>
                            <Carousel trending={trending} onPressCarouselItem={(index) => setSelectedMedia(trending[index])} />
                        </View>
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        position: 'absolute',
        height: '100%',
        resizeMode: 'cover',
        width: '100%',
    },

    backgroundMask: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.black50,
    },

    contentContainer: {
        flex: 1,
    },

    carouselContainer: {
        position: 'absolute',
        bottom: 5,
        left: 0,
        right: 0,
    },
});

export default Home;
