import { Image } from 'expo-image';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors, gStyle, tmdb } from '../constants';
import { useState } from 'react';

function Carousel({ trending, onPressCarouselItem }) {
    const [selected, setSelected] = useState(0);

    const BASE_URL = tmdb.images.secure_base_url;
    const POSTER_SIZE = tmdb.images.poster_sizes;

    const poster = `${BASE_URL}${POSTER_SIZE[3]}/`;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Em alta</Text>
            </View>
            <FlatList
                contentContainerStyle={gStyle.pHHalf}
                data={trending}
                horizontal
                keyExtractor={({ id }) => id.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => { onPressCarouselItem(index); setSelected(index) }}
                            activeOpacity={0.7}
                        >
                            <Image
                                key={item.id}
                                source={{
                                    uri: `${poster}${item.poster_path}`,
                                }}
                                contentFit='cover'
                                transition={400}
                                style={[
                                    styles.rectangleImage,
                                    selected === index && {
                                        borderWidth: 1,
                                        borderColor: 'white',
                                        opacity: 1
                                    },
                                ]}
                            />
                        </TouchableOpacity>
                    )
                }}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        bottom: 5,
    },

    header: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginVertical: 8
    },

    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.white
    },

    rectangleImage: {
        height: 170,
        resizeMode: 'contain',
        marginRight: 2.5,
        marginLeft: 2.5,
        width: 125,
        borderRadius: 5,
        opacity: 0.9
    },
});

export default Carousel;
