import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { styles } from '../themes';
import TreandingMovies from '../components/TreandingMovies';
import MovieList from '../components/MovieList';
import TopRated from '../components/TopRated'
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcoingMovies } from '../api/moviesapi';

const HomeScreen = () => {
    const [treanding, setTreanding] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [topRated, setTopRated] = useState([])
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    }, [])

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies()
        if (data && data.results) setTreanding(data?.results);
        setLoading(false)
    }
    const getUpcomingMovies = async () => {
        const data = await fetchUpcoingMovies()
        if (data && data.results) setUpcoming(data?.results);
        setLoading(false)
    }
    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies()
        if (data && data.results) setTopRated(data?.results);
        setLoading(false)
    }

    return (
        <View className="flex-1 bg-neutral-800">
            {/* search bar and logo */}
            <SafeAreaView className="mb-4 mt-3">
                <StatusBar style="light" />
                <View className="flex-row justify-between items-center mx-4">
                    <Bars3CenterLeftIcon size='30' strokeWidth={2} color='white' />
                    <Text className="text-white text-3xl font-bold">
                        <Text style={styles.text}>
                            M
                        </Text>
                        ovies
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                        <MagnifyingGlassIcon size='30' strokeWidth={2} color='white' />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {loading ? (
                <Loading />
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ padding: 10 }}>

                    {/* Trending Movies */}
                    {treanding.length > 0 && <TreandingMovies data={treanding} />}

                    {/* upcoming movies */}
                    {upcoming.length > 0 && <MovieList title="Upcoming" data={upcoming} />}

                    {/* Top Rated movies */}
                    {topRated.length > 0 && <TopRated title="Top Rated" data={topRated} />}

                </ScrollView>
            )}
        </View>
    )
}

export default HomeScreen