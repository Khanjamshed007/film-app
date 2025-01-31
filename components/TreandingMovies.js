import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel'
import MovieCard from './MovieCard'
import { useNavigation } from '@react-navigation/native'

var { width, height } = Dimensions.get('window')

const TreandingMovies = ({ data}) => {
    const navigation=useNavigation();
    const handleClick=(item)=>{
        navigation.navigate("Movie",item)
    }
    return (
        <View className="mb-8">
            <Text className="text-white text-xl mx-4 mb-5">Treanding</Text>
            <Carousel
                data={data}
                renderItem={({item}) => <MovieCard item={item} width={width} height={height} handleClick={handleClick}/>}
                firstItem={1}
                inactiveSlideOpacity={0.60}
                sliderWidth={width}
                itemWidth={width * .62}
                slideStyle={{ display: 'flex', alignItems: 'flex-start' }}
            />
        </View>
    )
}

export default TreandingMovies