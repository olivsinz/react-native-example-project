import React from 'react'
import { StyleSheet, View, TextInput, Button, FlatList, Text, ActivityIndicator } from 'react-native'
import movies from '../helpers/moviesData'
import MovieItem from './MovieItem'
import { getMoviesFromApiWithSearchedText } from '../API/TMDBApi'

class Search extends React.Component {

  constructor(props) {
    super(props)
    this.searchedText = "" //Initialization
    this.page = 0
    this.totalPages = 0
    this.state = {
      movies: [],
      isLoading: false
    }
  }

  _displayDetailForMovie = (idMovie) => {
    console.log("Display film with id " + idMovie)
    this.props.navigation.navigate("MovieDetail", {idMovie: idMovie})
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return(
        <View style={styles.loading_container}>
            <ActivityIndicator size='large' />
            {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
          </View>
      )
    }
  }

  _searchMovies() {
    this.page = 0
    this.totalPages = 0
    this.setState({
      movies: []
    }, () => {
      // J'utilise la paramètre length sur mon tableau de films pour vérifier qu'il y a bien 0 film
      console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.movies.length)
      this._loadMovies()
    })

  }

  _searchTextInputChanged(text) {
    this.searchedText = text // live edit of searchedText without state method
  }

  _loadMovies() {
    // console.log(this.searchedText)
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true })
      getMoviesFromApiWithSearchedText(this.searchedText, this.page + 1).then(data => {
        this.page = data.page
        this.totalPages = data.total_pages
        this.setState({
          movies: [...this.state.movies, ...data.results],
          isLoading: false
        })
      });
    }
  }

  render() {
    // console.log(this.state.isLoading)
    console.log(this.props)
    return (
      <View style={ styles.main_container }>
        <TextInput style={ styles.textinput }
          placeholder="Movie's title"
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchMovies()}
        />
        <Button style={ styles.searchbutton } title="Search" onPress={() => this._searchMovies()}/>
        <FlatList
          data={this.state.movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <MovieItem movie={item} displayDetailForMovie={this._displayDetailForMovie}/>}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.state.movies.length > 0 && this.page < this.totalPages) {
                this._loadMovies()
            }
          }}
        />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5
  },
  textinput: {
    height: 50,
    borderColor: '#0277bd',
    borderWidth: 1,
    paddingLeft: 5,
    color: '#0277bd',
    marginBottom: 10
  },
  searchbutton: {
    height:50
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Search
