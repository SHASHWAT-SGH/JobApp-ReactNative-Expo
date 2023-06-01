import React from 'react'
import {useState} from 'react'
import { View, Text,ActivityIndicator,TouchableOpacity,FlatList } from 'react-native'
import styles from './popularjobs.style'
import { useRouter } from 'expo-router'
import { COLORS,SIZES, } from '../../../constants'
import moduleName from '../../common/cards/popular/PopularJobCard'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import useFetch from  "../../../hook/useFetch"

const Popularjobs = () => {
const router = useRouter()
const {data, isLoading, error} = useFetch(
  'search', {
    query: 'react Developer',
    num_pages:1
  }
)
  console.log(data);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popularjobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading?(
          <ActivityIndicator size="large" color={COLORS.primary}/>
        ):error?(
          <Text>Something Went Wrong</Text>
        ):(
          <FlatList 
            data = {data}
            renderItem={({item})=>(
              <PopularJobCard 
                item={item}
              />
            )}
            keyExtractor={item=> item?.job_id}
            contentContainerStyle = {{columnGap: SIZES.medium}}
            horizontal
            showsHorizontalScrollIndicator = {false}
          />
        )}
      </View>
    </View>
  )
}

export default Popularjobs