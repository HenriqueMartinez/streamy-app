import { Image } from 'expo-image';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors, gStyle, tmdb } from '../constants';
import { useState } from 'react';

function Carousel({ trending, onPressCarouselItem }) {
    const [selected, setSelected] = useState(0);

    const { secure_base_url: BASE_URL, poster_sizes: POSTER_SIZE } = tmdb.images;
    const poster = `${BASE_URL}${POSTER_SIZE[3]}/`;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Sugestões</Text>
            </View>
            <FlatList
                contentContainerStyle={gStyle.pHHalf}
                data={trending}
                horizontal                
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => {
                            onPressCarouselItem(index);
                            setSelected(index);
                        }}
                        activeOpacity={0.7}
                    >
                        <Image
                            source={{
                                uri: `${poster}${item?.poster_path ?? item?.backdrop_path}`,
                            }}
                            contentFit='cover'
                            transition={400}
                            style={StyleSheet.flatten([
                                styles.rectangleImage,
                                selected === index && {
                                    borderWidth: 1,
                                    borderColor: 'white',
                                    opacity: 1
                                },
                            ])}
                        />
                    </TouchableOpacity>
                )}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },

    header: {
        flexDirection: 'row',
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
        height: 190,
        resizeMode: 'contain',
        marginRight: 2.5,
        marginLeft: 2.5,
        width: 140,
        borderRadius: 5,
        opacity: 0.9
    },
});

export default Carousel;
