import { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { tmdb, colors, gStyle } from '../constants';

import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import DropDownPicker from 'react-native-dropdown-picker';

// components
import HeaderManage from '../components/HeaderManage'

// svg
import SvgCheck from '../icons/Svg.Check';

// formatters
import formatDate from './../utils/formatDate';
import calculateRuntime from './../utils/calculateRuntime';

function ModalVideo({ route }) {
    const { title, name, release_date, first_air_date, runtime, overview, backdrop_path, url, seasons } = route.params;

    const BASE_URL_IMAGE = tmdb.images.secure_base_url;
    const SIZE = tmdb.images.backdrop_sizes[2];
    const poster = `${BASE_URL_IMAGE}${SIZE}/`;

    const video = useRef(null);
    const [loading, setLoading] = useState(false);
    const [selectedSeason, setSelectedSeason] = useState(0);
    const [episodeUrl, setEpisodeUrl] = useState(null);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    function setOrientation() {
        if (Dimensions.get('window').height > Dimensions.get('window').width) {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        } else {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        }
    }

    const dropDownItems = seasons?.map((season, index) => ({
        label: `Temporada ${season.season_number}`,
        value: index.toString(),
    }));

    const renderEpisodeItem = ({ item, index }) => (
        <TouchableOpacity
            activeOpacity={gStyle.activeOpacity}
            onPress={() => { setEpisodeUrl(item.url); }}
            style={styles.itemButton}
        >
            <Text style={styles.itemText}>Episódio {index + 1}</Text>

            {episodeUrl === item.url && (
                <View style={{
                    position: 'absolute',
                    top: '50%',
                    right: 15
                }}>
                    <SvgCheck />
                </View>
            )}
        </TouchableOpacity>
    );

    const handleLoadStart = () => {
        setLoading(true);
    };

    const handleLoad = () => {
        setLoading(false);
    };

    useEffect(() => {
        return () => {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        };
    }, []);

    return (
        <View style={gStyle.container}>
            <HeaderManage
                backText='Voltar'
                title={title ?? name}
            />
            <View style={styles.videoArea}>
                <Video
                    ref={video}
                    style={styles.playerArea}
                    source={{ uri: !seasons ? url : episodeUrl }}
                    shouldPlay
                    resizeMode='cover'
                    usePoster
                    posterSource={{ uri: `${poster}${backdrop_path}` }}
                    posterStyle={{ resizeMode: 'cover' }}
                    useNativeControls={!loading}
                    onFullscreenUpdate={setOrientation}
                    onLoadStart={handleLoadStart}
                    onLoad={handleLoad}
                />

                {loading && <ActivityIndicator size="large" color={colors.brandPrimary} style={styles.loading} />}
            </View>
            <ScrollView nestedScrollEnabled={true} style={styles.scrollList}>
                <Text style={styles.release_date}>
                    {!seasons ? 'Lançado em' : 'Estreou em'}{' '}
                    <Text style={{ color: '#58e2ac' }}>
                        {formatDate(release_date ?? first_air_date).toString()}
                    </Text>
                </Text>
                <Text style={styles.title}>{title ?? name}</Text>
                {!seasons && <Text style={styles.runtime}>Duração: {calculateRuntime(runtime)}</Text>}
                <Text style={styles.description}>{overview}</Text>
                {seasons && (
                    <>
                        <DropDownPicker
                            open={dropdownOpen}
                            setOpen={setDropdownOpen}
                            items={dropDownItems}
                            value={selectedSeason.toString()}
                            setValue={setSelectedSeason}
                            placeholder='Selecione a temporada'
                            theme='DARK'
                            dropDownDirection='BOTTOM'
                            containerStyle={{ width: '95%' }}
                            listMode='SCROLLVIEW'
                            scrollViewProps={{
                                nestedScrollEnabled: true
                            }}
                        />

                        <View style={styles.line} />

                        {seasons[selectedSeason] && (
                            <FlatList
                                data={seasons[selectedSeason].episodes}
                                renderItem={renderEpisodeItem}
                                keyExtractor={(item, index) => `${item.url}_${index}`}
                            />
                        )}
                    </>
                )}
            </ScrollView>
        </View >
    );
}

const styles = StyleSheet.create({
    videoArea: {
        width: '100%',
        height: '35%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    playerArea: {
        width: '100%',
        height: '100%',
    },

    loading: {
        position: 'absolute',
    },

    scrollList: {
        marginLeft: 15,
    },

    release_date: {
        color: colors.white,
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 20
    },

    title: {
        color: colors.white,
        fontSize: 30,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 10,
    },

    description: {
        color: colors.white,
        marginBottom: 10,
    },

    runtime: {
        color: colors.white,
        marginBottom: 10,
    },

    line: {
        opacity: 0.5,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginVertical: 10,
        marginRight: 15
    },

    itemButton: {
        backgroundColor: colors.black20,
        borderRadius: 10,
        padding: 10,
        marginRight: 15,
        marginBottom: 5,
        flexDirection: 'row'
    },

    itemText: {
        color: colors.white,
        fontSize: 20,
        fontWeight: 'bold',
    }
});

export default ModalVideo;
