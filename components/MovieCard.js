import { View, Text, TouchableWithoutFeedback, Image } from 'react-native'
import React from 'react'
import { image500 } from '../api/moviesapi'

const MovieCard = ({ width, height, item, handleClick }) => {
    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <Image
                source={{uri:image500(item?.poster_path)}}
                style={{
                    width: width * .6,
                    height: height * .4
                }}
                className="rounded-3xl"
            />
        </TouchableWithoutFeedback>
    )
}

export default MovieCard