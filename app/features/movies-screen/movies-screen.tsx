import * as React from "react"
import { NavigationScreenProps } from "react-navigation"
import { connect } from "react-redux"
import { createSelector } from "reselect"
import { withCollapsible } from "react-navigation-collapsible"
import { Animated, FlatList } from "react-native"
import SearchHeader, { SEARCH_STATE } from "../../components/search-header/search-header"
import { Card, Paragraph } from "react-native-paper"
import ISearchResponse, { ISearchResult } from "../../services/moviedb-api/models/isearch-response"
import Activity from "../../components/activity/activity"
import AppConfig from "../../config/app-config"
import MoviesActions from "./movies-redux"
import ISearchParam from "../../services/moviedb-api/models/isearch-param"

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)


export interface INavigationProps {
  onSearch: (text: string) => void
  searchMode: SEARCH_STATE
  onTabChange: (tabId: SEARCH_STATE) => void
}

export interface IMoviesScreenProps extends NavigationScreenProps<INavigationProps> {
  collapsible: { paddingHeight: number, animatedY: number, onScroll: () => void }, // this is injected by withCollapsible HOC
  fetching: boolean,
  error?: string,
  data?: ISearchResult[]
}

// tslint:disable-next-line
export interface IMoviesScreenState {

}

class MoviesScreen extends React.Component<IMoviesScreenProps, IMoviesScreenState> {

  constructor(props: IMoviesScreenProps) {
    super(props)
  }

  /**
   * since we are using navigaiton props, i dont want the screen and list items to update
   * @param nextProps
   * @param nextState
   */
  public shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.fetching !== this.props.fetching ||
      nextProps.error !== this.props.error ||
      nextProps.data !== this.props.data
    ) {
      return true
    }
    return false
  }


  public renderItem = ({ item }) => {
    console.log("Rendering list item: ")
    return <Card>
      <Card.Title title={item.title} subtitle={"Rating : " + item.vote_average}/>
      <Card.Cover source={{ uri: AppConfig.imagePrefix + item.backdrop_path }}/>
      <Card.Content>
        <Paragraph>{item.overview}</Paragraph>
      </Card.Content>
    </Card>
  }

  public render() {
    const { paddingHeight, animatedY, onScroll } = this.props.collapsible
    return (
      <>
        <AnimatedFlatList
          style={{ flex: 1 }}
          data={this.props.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => String(item.id)}
          contentContainerStyle={{ paddingTop: paddingHeight }}
          scrollIndicatorInsets={{ top: paddingHeight }}
          onScroll={onScroll}
          _mustAddThis={animatedY}
        />
        <Activity show={this.props.fetching}/>
      </>
    )
  }
}

// do memoization , so that it stays same for overlapping values
const fetchingFnc = (state) => state.movies.topMoviesFetching || state.movies.topMoviesFetching || state.movies.popularMoviesFetching
const errorFnc = (state) => state.movies.topMoviesError || state.movies.topMoviesError || state.movies.popularMoviesError

const dataFnc = (state, props) => {
  const currentState = (props.navigation.state.params && props.navigation.state.params.searchMode) || SEARCH_STATE.TOP
  let data: ISearchResponse
  if (currentState === SEARCH_STATE.TOP) {
    data = state.movies.topMoviesResponse
  }
  else if (currentState === SEARCH_STATE.POPULAR) {
    data = state.movies.popularMoviesResponse
  }
  else if (currentState === SEARCH_STATE.SEARCH) {
    data = state.movies.searchMoviesResponse
  }

  return (data && data.results) || []
}


const mapFnc = createSelector(
  [
    fetchingFnc,
    errorFnc,
    dataFnc,
  ], (fetching, error, data) => {
    return {
      fetching,
      error,
      data,
    }
  })

const mapStateToProps = (state, props) => {
  return mapFnc(state, props)
}
const mapDispatchToProps = (dispatch) => {
  return {
    requestTopMovies: (topMoviesRequest: { page: number }) => dispatch(MoviesActions.requestTopMovies(topMoviesRequest)),
    requestPopularMovies: (popularMoviesRequest: { page: number }) => dispatch(MoviesActions.requestPopularMovies(popularMoviesRequest)),
    requestSearchMovies: (searchMoviesRequest: ISearchParam) => dispatch(MoviesActions.requestSearchMovies(searchMoviesRequest)),

  }

}

const moviesScreen = connect(mapStateToProps, mapDispatchToProps)(MoviesScreen)

console.log(moviesScreen)

const collapsibleParams = {
  collapsibleComponent: SearchHeader,
  collapsibleBackgroundStyle: {
    height: 120,
    // disableFadeoutInnerComponent: true,
  },
}

export default withCollapsible(moviesScreen, collapsibleParams)





