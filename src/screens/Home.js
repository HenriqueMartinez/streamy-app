import axios from 'axios';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import { colors, gStyle } from '../constants';

import Carousel from '../components/Carousel';
import MediaContent from '../components/MediaContent';

function Home({ navigation }) {
    const BASE_URL = 'https://api.themoviedb.org/3';
    const API_KEY = '69d1654897a16e57275142eaf00c632e';

    const [selectedMedia, setSelectedMedia] = useState({});
    const [trending, setTrending] = useState([]);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axios
            .get(`${BASE_URL}/trending/all/week`, {
                params: {
                    api_key: API_KEY,
                    region: 'BR',
                    language: 'pt-BR'
                },
                cancelToken: source.token
            })
            .then(response => {
                setTrending(response.data.results);
                setSelectedMedia(response.data.results[0]);
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    console.log('Requisição cancelada:', error.message);
                } else {
                    console.error('Erro na requisição:', error.message);
                }
            });

        return () => {
            source.cancel('Requisição cancelada pelo cleanup do componente');
        };
    }, []);

    return (
        <View style={gStyle.container}>            
            <MediaContent selectedMedia={selectedMedia} />            
            <Carousel trending={trending} onPressCarouselItem={(index) => setSelectedMedia(trending[index])} />
        </View>
    );
}

export default Home;
