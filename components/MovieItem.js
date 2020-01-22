import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'


class MovieItem extends React.Component {
  render() {
    const { movie, displayDetailForMovie } = this.props
    return (
      <TouchableOpacity style={styles.main_container} flexDirection='row' onPress={() => displayDetailForMovie(movie.id)}>
        <Image
          style={styles.image}
          source={{uri: getImageFromApi(movie.poster_path)}}
        />
        <View flexDirection='column' style={styles.content_box}>
          <View flexDirection='row' style={styles.header_box}>
            <Text style={styles.title_text}>{movie.title}</Text>
            <Text style={styles.vote_text}>{movie.vote_average}</Text>
          </View>
          <View style={styles.description_box}>
            <Text style={styles.description_text} numberOfLines={6}>{movie.overview}</Text>
          </View>
          <View style={styles.date_box}>
            <Text style={styles.date_text}>{movie.release_date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row'
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: 'gray'
  },
  content_box: {
    flex: 1,
    margin: 5,
    // backgroundColor: 'yellow'
  },
  header_box: {
    flex: 3,
    flexDirection: 'row',
    // backgroundColor: 'green'
  },
  title_text: {
    // backgroundColor: 'blue',
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  vote_text: {
    // backgroundColor: 'purple',
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'
  },
  description_box: {
    flex: 7
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  date_box: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  }
})

export default MovieItem
