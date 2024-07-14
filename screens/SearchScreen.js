import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native'
import React, { useCallback, useState } from 'react'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/Loading'
var { width, height } = Dimensions.get('window')
import { debounce } from 'lodash'
import { fetchSearchMovies, image500 } from '../api/moviesapi'
const SearchScreen = () => {
    const navigation = useNavigation()
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false);

    const handleSearch = (value) => {
        if (value && value.length > 2) {
            setLoading(true)
            fetchSearchMovies({
                query: value,
                include_adult: 'false',
                language: 'en-US',
                page: '1'
            }).then(data => {
                setLoading(false)
                setResults(data?.results)
            })
        } else {
            setLoading(false)
            setResults([])
        }
    }

    const handleDebounceSearch = useCallback(debounce(handleSearch, 400), [])

    return (
        <SafeAreaView className='bg-neutral-800 flex-1'>
            <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full p-1 mt-4">
                <TextInput
                    onChangeText={handleDebounceSearch}
                    placeholder='Search Movie'
                    placeholderTextColor={'lightgray'}
                    className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate("Home")}
                    className="rounded-full p-2.5 bg-neutral-500"
                >
                    <XMarkIcon size='18' color='white' />
                </TouchableOpacity>
            </View>

            {/* Results */}
            {loading ? (
                <Loading />
            ) : (
                results.length > 0 ? (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 15 }}
                        className='space-y-3 mx-3'>
                        <Text className="text-white font-semibold ml-1">Results ({results.length})</Text>
                        <View className="flex-row justify-between flex-wrap">
                            {
                                results.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => navigation.push("Movie", item)}>
                                            <View className="space-y-2 mb-4">
                                                <Image
                                                    className="rounded-3xl"
                                                    // source={require('../assets/images/avengers.jpg')}
                                                    source={{ uri: image500(item?.poster_path) }}
                                                    style={{ width: width * .45, height: height * .3 }}
                                                />
                                                <Text className="text-neutral-400 text-center">
                                                    {item?.title.length > 22 ? item?.title.slice(0, 22) + "..." : item ?.title}
                                                </Text>

                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                ) : (
                    <View className="flex-1 justify-center items-center">
                        <Text className="text-white font-semibold text-center">No Results</Text>
                    </View>
                )
            )}
        </SafeAreaView>
    )
}

export default SearchScreen