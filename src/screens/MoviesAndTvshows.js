import { Fragment, useEffect, useState } from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import debounce from 'lodash.debounce';
import { Image } from 'expo-image';

// components
import HeaderManage from '../components/HeaderManage';
import HeaderSearch from '../components/HeaderSearch';

// contexts
import { useMovieTVContext } from '../contexts/MovieTVData';

// constants
import { gStyle, colors, tmdb, api } from '../constants';

const numColumns = 4;
const itemSize = Dimensions.get('window').width / numColumns;
const itemsPerPage = 20;

function MoviesAndTvshows({ navigation, route }) {
    const { type, value } = route.params;
    const { movies, setMovies, tvShows, setTVShows } = useMovieTVContext();

    const [loading, setLoading] = useState(false);
    const [filteredData, setFilteredData] = useState(null);
    const [page, setPage] = useState(1);

    const BASE_URL_IMAGE = tmdb.images.secure_base_url;
    const SIZE = tmdb.images.backdrop_sizes[2];
    const poster = `${BASE_URL_IMAGE}${SIZE}/`;

    const debouncedSearch = debounce((text) => handleSearch(text), 6000);
    const immediateSearch = (text) => {
        if (text === '') {
            setFilteredData(null);
            setLoading(false);
        } else {
            setLoading(true);
            debouncedSearch(text);
        }
    };

    const handleSearch = async (text) => {
        const response = await api.get(`/api/streamy/${type === 'movies' ? 'movies' : 'tvshows'}/search`, {
            params: {
                title: text.toLowerCase(),
            },
        });

        if (response && response.data.foundMovies.length > 0) {
            setFilteredData(response.data.foundMovies);
            setLoading(false);
        }
    };

    const cancelSearch = () => {
        setFilteredData(null);
        setLoading(false);
    }

    useEffect(() => {
        if ((type === 'movies' && movies.length === 0) || (type === 'tvshows' && tvShows.length === 0)) {
            async function fetchData() {
                const Response = await api.get(type === 'movies' ? '/api/streamy/getMovies/1' : '/api/streamy/getTvShows/1');

                if (Response) {
                    switch (type) {
                        case 'movies':
                            setMovies(Response.data.movies);
                            break;
                        case 'tvshows':
                            setMovies(Response.data.tvshows);
                            break;

                        default:
                            break;
                    }
                }
            }

            fetchData();
        }
    }, []);

    // const fetchData = async (url, setter) => {
    //     try {
    //         const response = await api.get(url);

    //         if (response) {
    //             setMovies(...movies, response.data[type])
    //             // console.log(movies)
    //             // setter(response.data[type]);
    //         }
    //     } catch (error) {
    //         console.error(`Error fetching ${type}: `, error);
    //     }
    // }

    // const loadMoreData = async () => {
    //     setPage((prevPage) => prevPage + 1);
    //     fetchData(type === 'movies' ? `/api/streamy/getMovies/${page}` : `/api/streamy/getTvShows/${page}`, type === 'movies' ? setMovies : setTVShows);
    // };

    const Item = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ModalVideo', { ...item })}>
            <Image
                source={{
                    uri: `${poster}${item?.poster_path ?? item?.backdrop_path}`,
                }}
                contentFit='cover'
                transition={300}
                style={styles.item}
            />
        </TouchableOpacity>
    );

    return (
        <Fragment>
            <View style={gStyle.container}>
                <HeaderManage
                    backText='Voltar'
                    title={value}
                />
                {(type === 'movies' && movies.length === 0) || (type === 'tvshows' && tvShows.length === 0) ? (
                    <ActivityIndicator size='large' color={colors.brandPrimary} style={{ flex: 1 }} />
                ) : (
                    <>
                        <HeaderSearch handleSearch={immediateSearch} cancelSearch={cancelSearch} />
                        {loading ? (
                            <ActivityIndicator size='large' color={colors.brandPrimary} style={{ flex: 1 }} />
                        ) : (
                            <FlatList
                                data={filteredData ?? (type === 'movies' ? movies : tvShows)}
                                renderItem={Item}
                                keyExtractor={(item) => `${type} -${item._id} `}
                                numColumns={numColumns}
                                contentContainerStyle={styles.flatList}
                                // onEndReached={loadMoreData}
                                // onEndReachedThreshold={0.1}
                                getItemLayout={(data, index) => ({
                                    length: itemSize * 1.5,
                                    offset: (itemSize * 1.5 + 1) * index,
                                    index,
                                })}
                                initialNumToRender={15}
                            />
                        )}
                    </>
                )}
            </View>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    flatList: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    item: {
        width: itemSize,
        height: itemSize * 1.5,
        margin: 1,
    },
});

export default MoviesAndTvshows;
