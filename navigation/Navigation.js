import { createStackNavigator } from 'react-navigation'
import Search from '../components/Search'
import MovieDetail from '../components/MovieDetail'

const SearchStackNavigator = createStackNavigator({
  Search: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
    screen: Search,
    navigationOptions: {
      title: 'Rechercher'
    }
  },
  MovieDetail: {
    screen: MovieDetail,
    navigationOptions: {
      title: 'Details'
    }
  }
})

export default SearchStackNavigator
