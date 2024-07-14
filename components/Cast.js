import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { image500 } from '../api/moviesapi';

const Cast = ({ cast = [], navigation }) => {
    if (!cast || cast.length === 0) {
        return null; // Or render a loading indicator or message
    }
    return (
        <View className="my-6">
            <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20 }}
            >
                {cast.map((person, index) => (
                    <TouchableOpacity
                        key={index}
                        className="mx-4 items-center"
                        onPress={() => navigation.navigate("Person", person)}
                    >
                        <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
                            <Image
                                className="rounded w-20 h-20"
                                source={{uri:image500(person?.profile_path)}}
                                resizeMode='contain'
                            />
                        </View>

                        <Text className="text-white text-sm mt-1">
                            {person?.character.length > 10 ? person?.character.slice(0, 10) + "..." : person?.character}
                        </Text>
                        <Text className="text-white text-sm mt-1">
                            {person?.name.length > 10 ? person?.name.slice(0, 10) + "..." : person?.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

export default Cast;
