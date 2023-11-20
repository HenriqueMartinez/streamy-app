import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigation from './TabNavigation';

import ModalAddProfile from '../screens/ModalAddProfile';
import ModalVideo from '../screens/ModalVideo';
import ModalLiveTV from '../screens/ModalLiveTV';
import ModalManageProfiles from '../screens/ModalManageProfiles';
import MoviesAndTvshows from '../screens/MoviesAndTvshows';
import Authentication from '../screens/Authentication';

import { api } from '../constants';
import { useEffect } from 'react';
import { useMovieTVContext } from '../contexts/MovieTVData';
import { useAuthContext } from '../contexts/AuthContext';

const Stack = createNativeStackNavigator();

function RootStack() {
    const { setMovies, setTVShows, setTrending, setLives } = useMovieTVContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const getAllContent = async () => {
            try {
                const suggestionsResponse = await api.get('/api/streamy/getSuggestions');
                if (suggestionsResponse) {
                    setTrending(suggestionsResponse.data.trending);
                }

                const moviesResponse = await api.get('/api/streamy/getMovies/1');
                if (moviesResponse) {
                    setMovies(moviesResponse.data.movies);
                }

                const tvshowsResponse = await api.get('/api/streamy/getTvShows/1');
                if (tvshowsResponse) {
                    setTVShows(tvshowsResponse.data.tvshows);
                }

                const livesResponse = await api.get('/api/streamy/getLiveTV');
                if (livesResponse) {
                    setLives(livesResponse.data.lives);
                }
            } catch (error) {
                console.error('Error fetching content:', error);
            }
        };

        getAllContent();
    }, []);

    return (
        <NavigationContainer theme={DarkTheme}>
            <Stack.Navigator
                screenOptions={{
                    presentation: 'fullScreenModal'
                }}
            >
                {user ? (
                    <>
                        <Stack.Screen
                            name="TabNavigation"
                            component={TabNavigation}
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen
                            name="MoviesAndTvshows"
                            component={MoviesAndTvshows}
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen
                            name="ModalVideo"
                            component={ModalVideo}
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen
                            name="ModalLiveTV"
                            component={ModalLiveTV}
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen
                            name="ModalAddProfile"
                            component={ModalAddProfile}
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen
                            name="ModalManageProfiles"
                            component={ModalManageProfiles}
                            options={{
                                headerShown: false
                            }}
                        />
                    </>
                ) : (
                    <>
                        <Stack.Screen
                            name="Authentication"
                            component={Authentication}
                            options={{
                                headerShown: false
                            }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootStack;
