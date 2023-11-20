import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, gStyle } from '../constants';

// components
import TouchTextIcon from './TouchTextIcon';
import TouchPlayButton from './TouchPlayButton';

// icons
import SvgCheck from '../icons/Svg.Check';
import SvgInfo from '../icons/Svg.Info';
import SvgPlus from '../icons/Svg.Plus';

// formatters
import formatDate from './../utils/formatDate';

function MediaContent({ navigation, selectedMedia }) {
    return (
        <View style={styles.container}>

            <View style={styles.informations}>
                <Text numberOfLines={2} style={styles.infoTitle}>{selectedMedia?.title ?? selectedMedia?.name}</Text>

                <View style={styles.otherInfo}>
                    {(selectedMedia?.release_date ?? selectedMedia?.first_air_date) && (
                        <Text style={styles.otherInfoTitle}>
                            {selectedMedia.media_type === 'movie' ? 'Lançado em' : 'Estreou em'}{' '}
                            {formatDate(selectedMedia.release_date ?? selectedMedia.first_air_date).toString()}
                        </Text>
                    )}
                </View>

                {selectedMedia?.overview && (
                    <Text numberOfLines={3} style={styles.infoDescription}>
                        {selectedMedia.overview}
                    </Text>
                )}

                <View style={[gStyle.flexRowSpace, { marginTop: 15 }]}>
                    <TouchTextIcon
                        icon={<SvgPlus />}
                        onPress={() => null}
                        text='Adicionar a lista'
                    />

                    <TouchPlayButton onPress={() => navigation.navigate('ModalVideo', { ...selectedMedia })} />

                    <TouchTextIcon icon={<SvgInfo />} onPress={() => null} text='Informações' />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
    },

    informations: {
        ...StyleSheet.absoluteFillObject,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        rowGap: 20,
    },

    infoTitle: {
        color: colors.white,
        fontSize: 30,
        fontFamily: fonts.medium,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        marginBottom: 10,
    },

    otherInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

    otherInfoTitle: {
        color: colors.white,
        fontSize: 16,
        textAlign: 'center',
        marginRight: 10,
    },

    infoDescription: {
        color: 'gray',
        fontSize: 16,
        fontFamily: fonts.medium,
        textAlign: 'center',
        marginBottom: 10,
    }
});

export default MediaContent;
