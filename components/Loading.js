import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress'
import { theme } from '../themes'

const { width, height } = Dimensions.get("window")

const Loading = () => {
  return (
    <View style={{height,width}} className="absolute flex-row justify-center items-center">
      <Progress.CircleSnail thickness={5} size={100} color={theme.backgorund}/>
    </View>
  )
}

export default Loading