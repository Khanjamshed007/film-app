import { View, Text, Dimensions, Platform, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from '../themes';
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import { fetchPersonDetails, fetchPersonMovies, image500 } from '../api/moviesapi';

var { width, height } = Dimensions.get('window')
const ios = Platform.OS == 'ios';
const verticalMargin = ios ? '' : 'my-3'

const PersonScreen = () => {
    const [isFav, setIsFav] = useState(false)
    const [personData, setPersonData] = useState({})
    const { params: person } = useRoute();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [personMovies, setPersonMovies] = useState([])

    const getPersonDetail = async (id) => {
        const data = await fetchPersonDetails(id);
        if (data && data) setPersonData(data);
        setLoading(false)
    }
    const getPersonMovie = async (id) => {
        const data = await fetchPersonMovies(id);
        if (data && data?.cast) setPersonMovies(data?.cast);
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        getPersonDetail(person?.id);
        getPersonMovie(person?.id);
    }, [person])

    return (
        <ScrollView className="flex-1 bg-neutral-900" contentContainerStyle={{ paddingBottom: 20 }}>
            {/* Back Button */}
            <SafeAreaView className={" w-full flex-row justify-between items-center px-4 " + verticalMargin}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backgorund} className="rounded-xl p-1">
                    <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsFav(!isFav)}>
                    <HeartIcon size={35} color={isFav ? 'red' : "white"} />
                </TouchableOpacity>
            </SafeAreaView>

            {/* Person Details*/}
            {loading ? (
                <Loading />
            ) : (
                <View>
                    <View className="flex-row justify-center"
                        style={{
                            shadowColor: 'gray',
                            shadowRadius: 40,
                            shadowOffset: { width: 0, height: 5 },
                            shadowOpacity: 1
                        }}
                    >
                        <View className="rounded-full overflow-hidden border-2 border-neutral-500 w-45 h-45 items-center">
                            <Image
                                source={{ uri: image500(personData?.profile_path) }}
                                style={{
                                    width: width * .5,
                                    height: height * .23
                                }}
                                resizeMode='cover'
                            />
                        </View>
                    </View>
                    <View className="mt-5">
                        <Text className="text-white text-3xl font-bold text-center">{personData?.name}</Text>
                        <Text className="text-neutral-500 text-base text-center">{personData?.place_of_birth}</Text>
                    </View>
                    <View className="mx-3 p-3 rounded-full mt-6 flex-row justify-between items-center bg-neutral-700">
                        <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                            <Text className="text-white font-semibold text-center">Gender</Text>
                            <Text className="text-neutral-300 text-sm text-center">{person.gender === 1 ? "Female" : "Male"}</Text>
                        </View>
                        <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                            <Text className="text-white font-semibold text-center">Birthday</Text>
                            <Text className="text-neutral-300 text-sm text-center">
                                {personData?.birthday && new Date(personData.birthday).toLocaleDateString('en-GB')}
                            </Text>
                        </View>
                        <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                            <Text className="text-white font-semibold text-center">Know for</Text>
                            <Text className="text-neutral-300 text-sm text-center">{personData?.known_for_department}</Text>
                        </View>
                        <View className="px-2 items-center">
                            <Text className="text-white font-semibold text-center">Popularity</Text>
                            <Text className="text-neutral-300 text-sm text-center">{personData?.popularity?.toFixed(2)}</Text>
                        </View>
                    </View>
                    <View className="my-6 mx-4 space-y-2">
                        <Text className="text-white text-lg font-semibold">Biography</Text>
                        <Text className="text-neutral-400 tracking-wider">{personData?.biography || "N/A"}</Text>
                    </View>

                    {/* Movies */}
                    <MovieList title="Movies" hideSeeAll={true} data={personMovies} />
                </View>
            )}
        </ScrollView>
    )
}

export default PersonScreen