import { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { colors, gStyle, api } from '../constants';

import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import DropDownPicker from 'react-native-dropdown-picker';

// components
import HeaderManage from '../components/HeaderManage'

// contexts
import { useMovieTVContext } from '../contexts/MovieTVData';

// svg
import SvgCheck from '../icons/Svg.Check';

function ModalLiveTV() {
    const { lives, setLives } = useMovieTVContext();

    const video = useRef(null);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [channelUrl, setChannelUrl] = useState(null);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    function setOrientation() {
        if (Dimensions.get('window').height > Dimensions.get('window').width) {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        } else {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        }
    }

    const dropDownItems = lives?.map((live, index) => ({
        label: `${live.title.substring(1)}`,
        value: index.toString(),
    }));

    const renderEpisodeItem = ({ item, index }) => (
        <TouchableOpacity
            activeOpacity={gStyle.activeOpacity}
            onPress={() => { setChannelUrl(item.url); }}
            style={styles.itemButton}
        >
            <Text style={styles.itemText}>{item.title}</Text>

            {channelUrl === item.url && (
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
        if (lives.length === 0) {
            async function loadLives() {
                const livesResponse = await api.get('/api/streamy/getLiveTV');
                if (livesResponse) {
                    setLives(livesResponse.data.lives);
                }
            }

            loadLives();
        }

        return () => {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        };
    }, []);

    return (
        <View style={gStyle.container}>
            <HeaderManage
                backText='Voltar'
                title={'Canais ao VIVO'}
            />
            {lives.length === 0 ? (
                <ActivityIndicator size='large' color={colors.brandPrimary} style={{ flex: 1 }} />
            ) : (
                <>
                    <View style={styles.videoArea}>
                        <Video
                            ref={video}
                            style={styles.playerArea}
                            source={{ uri: channelUrl }}
                            shouldPlay
                            resizeMode='cover'
                            usePoster
                            posterSource={{ uri: 'https://i.imgur.com/jiJilmD.png' }}
                            posterStyle={{ resizeMode: 'cover' }}
                            useNativeControls={!loading}
                            onFullscreenUpdate={setOrientation}
                            onLoadStart={handleLoadStart}
                            onLoad={handleLoad}
                        />

                        {loading && <ActivityIndicator size="large" color={colors.brandPrimary} style={styles.loading} />}
                    </View>
                    <ScrollView nestedScrollEnabled={true} style={styles.scrollList}>
                        <DropDownPicker
                            open={dropdownOpen}
                            setOpen={setDropdownOpen}
                            items={dropDownItems}
                            value={selectedCategory.toString()}
                            setValue={setSelectedCategory}
                            placeholder='Selecione a temporada'
                            theme='DARK'
                            dropDownDirection='BOTTOM'
                            containerStyle={{ width: '95%' }}
                            listMode='SCROLLVIEW'
                            scrollViewProps={{
                                nestedScrollEnabled: true,

                            }}
                            style={{ marginTop: 10 }}
                        />
                        <View style={styles.line} />

                        {lives[selectedCategory] && (
                            <FlatList
                                data={lives[selectedCategory].channels}
                                renderItem={renderEpisodeItem}
                                keyExtractor={(item, index) => `${item.url}_${index}`}
                            />
                        )}
                    </ScrollView>
                </>
            )}
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

export default ModalLiveTV;
