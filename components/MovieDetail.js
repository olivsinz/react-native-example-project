import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image } from 'react-native'
import { getMovieDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'

class MovieDetail extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      movie: undefined, // Pour l'instant on n'a pas les infos du film, on initialise donc le film à undefined.
      isLoading: true // A l'ouverture de la vue, on affiche le chargement, le temps de récupérer le détail du film
    }
  }

  componentDidMount() {
    console.log("Component FilmDetail monté")
    getMovieDetailFromApi(this.props.navigation.state.params.idMovie).then( data => {
      this.setState({
        movie: data,
        isLoading: false
      })
    })
  }

  _displayLoading() {
    if (this.state.isLoading) {
      // Si isLoading vaut true, on affiche le chargement à l'écran
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _displayMovie() {
    movie = this.state.movie
    if (this.state.movie != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image}
            source={{uri: getImageFromApi(this.state.movie.backdrop_path)}}
          />
          <Text style={styles.title_text}>{movie.title}</Text>
          <Text style={styles.description_text}>{movie.overview}</Text>
          <Text style={styles.default_text}>Sorti le : {moment(new Date(movie.release_date)).format('DD/MM/YYYY')}</Text>
          <Text style={styles.default_text}>Note : {movie.vote_average} / 10</Text>
          <Text style={styles.default_text}>Nombre de votes : {movie.vote_count}</Text>
          <Text style={styles.default_text}>Budget : {numeral(movie.budget).format('0,0[.]00 $')}</Text>
          <Text style={styles.default_text}>Genre(s) : {movie.genres.map(function(genre){
              return genre.name;
            }).join(" / ")}
          </Text>
          <Text style={styles.default_text}>Companie(s) : {movie.production_companies.map(function(company){
              return company.name;
            }).join(" / ")}
          </Text>
        </ScrollView>
      )
    }
  }

  render() {
    console.log("Component FilmDetail rendu")
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayMovie()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1,
    marginBottom: 5
  },
  image: {
    // width: 240,
    height: 169,
    margin: 5,
    // backgroundColor: 'gray'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  }
})

export default MovieDetail
