import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image, Dimensions } from 'react-native'
import React from 'react'
import { styles } from '../themes'
import { useNavigation } from '@react-navigation/native'
import { image342, image500 } from '../api/moviesapi'

var { width, height } = Dimensions.get('window')

let movieName = "Avengers Endgame"

const MovieList = ({ title, data, hideSeeAll }) => {
    const navigation = useNavigation()
    return (
        <View className="mb-5 space-y-4">
            <View className="mx-4 flex-row justify-between items-center">
                <Text className="text-xl text-white">{title}</Text>
                {!hideSeeAll && (
                    <TouchableOpacity>
                        <Text style={styles.text}>See All</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* moive row */}
            <ScrollView

                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {data.map((item, index) => {
                    return (
                        <TouchableWithoutFeedback
                            key={index}
                            onPress={() => navigation.push("Movie", item)}>
                            <View className="space-y-1 mr-4">
                                <Image
                                    // source={require('../assets/images/avengers.jpg')}
                                    source={{uri:image342(item?.poster_path)}}
                                    style={{
                                        width: width * .33,
                                        height: height * .22
                                    }}
                                    className="rounded-xl"
                                />
                                <Text className="text-neutral-300 ml-1 pt-1">{item?.title.length > 14 ? item?.title.slice(0, 14) + '...' : item?.title}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default MovieList;