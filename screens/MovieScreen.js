import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Platform, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from '../themes';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import { fetchCreditsMovies, fetchDetailsMovies, fetchSimilarMovies, image500 } from '../api/moviesapi';

var { width, height } = Dimensions.get('window')
const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : 'mt-3';
let movieName = "John Wick"

const MovieScreen = () => {
    const { params: item } = useRoute();
    const [isFav, setIsFav] = useState(false)
    const [castData, setCastData] = useState([])
    const [similarMovies, setSimilarMovies] = useState([])
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [movieData, setMovieData] = useState({});

    const getDetailsMovies = async (id) => {
        const data = await fetchDetailsMovies(id)
        if (data && data) setMovieData(data);
        setLoading(false)
    }
    const getCreditMovies = async (id) => {
        const data = await fetchCreditsMovies(id)
        if (data && data?.cast) setCastData(data?.cast);
        setLoading(false)
    }
    const getSimilarMovies = async (id) => {
        const data = await fetchSimilarMovies(id)
        if (data && data?.results) setSimilarMovies(data?.results);
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        getDetailsMovies(item?.id);
        getCreditMovies(item?.id);
        getSimilarMovies(item?.id);
    }, [item])
    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            className="flex-1 bg-neutral-900"
        >
            <View className="w-full">
                <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 " + topMargin}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backgorund} className="rounded-xl p-1">
                        <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsFav(!isFav)}>
                        <HeartIcon size={35} color={isFav ? theme.backgorund : "white"} />
                    </TouchableOpacity>
                </SafeAreaView>
                {loading ? (
                    <Loading />
                ) : (
                    <View>
                        <Image
                            // source={require('../assets/images/john.jpg')}
                            source={{ uri: image500(movieData?.poster_path) }}
                            style={{ width, height: height * 0.55 }}
                            resizeMode='cover'
                        />
                        <LinearGradient
                            colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                            style={{ width, height: height * 0.44 }}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            className="absolute bottom-0"
                        />
                    </View>
                )}
            </View>

            {/* Movie Details*/}
            <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
                <Text className="text-white text-center text-3xl font-bold tracking-wider px-2">
                    {movieData?.title}
                </Text>

                {/* Status,relese,time */}
                {movieData?.id ? (
                    <Text className="text-neutral-400 font-medium text-base text-center">
                        {movieData?.status} • {movieData?.release_date} • {movieData?.runtime} min
                    </Text>
                ) : null}

                <View className="flex-row justify-center mx-4 space-x-2">
                    {movieData?.genres?.map((item, index) => {
                        let showDot = index + 1 != movieData.genres.length;
                        return (
                            <Text key={item?.id} className="text-neutral-400 font-medium text-base text-center">
                                {item?.name} {showDot ? " • " : null}
                            </Text>
                        )

                    })}
                </View>

                <Text className="text-neutral-400 mx-4 tracking-wider">
                    {movieData?.overview}
                </Text>
            </View>

            {/* Cast */}
            {castData && castData.length > 0 && <Cast navigation={navigation} cast={castData} />}

            {/* Similar Movies */}
            {similarMovies && similarMovies.length > 0 && <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />}

        </ScrollView>
    )
}

export default MovieScreen