import React from 'react';

/*const App = (props) => (
  //<div>Hello World!</div>
  var movies: [
    {title: 'Mean Girls'},
    {title: 'Hackers'},
    {title: 'The Grey'},
    {title: 'Sunshine'},
    {title: 'Ex Machina'},
  ];

  <ul>
    {movies.forEach(movie => return <li>{movie.title}</li>)}
  </ul>

);*/

//WORKING ON LEVEL 4, SUBMITTING EXTRA DATA

class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      allMoviesList: [],
      searchedMoviesList: [],
      watchedMovies: [],
      unwatchedMovies: [],
      displayedMovies: [],
      searchValue: '',
      titleValue: '',
      yearValue: '',
      runtimeValue: '',
      watchedValue: 'To Watch'
      //toggleButton: 'To Watch'
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleRuntimeChange = this.handleRuntimeChange.bind(this);

    this.handleWatched = this.handleWatched.bind(this);
    this.handleToWatch = this.handleToWatch.bind(this);
    this.toggleWatched = this.toggleWatched.bind(this);
    this.showDescription = this.showDescription.bind(this);

  }

  handleSearch(event) {

    event.preventDefault();

    let input = this.state.searchValue;
    this.setState({ searchValue: '', searchedMoviesList: [] });
    let count = 0;
    var newItems = [];

    for (var i = 0; i < this.state.allMoviesList.length; i++) {

      if (this.state.allMoviesList[i].key.search(input) === 0) {
        count++;
        newItems.push(this.state.allMoviesList[i]);
      }
    }

    this.setState({ searchedMoviesList: this.state.searchedMoviesList.concat(newItems) });

    if (count === 0) {
      this.setState({ searchedMoviesList: [<h3 key="null">No Movies Found</h3>] });
    }

  }

  showDescription(event) {
   // console.log(event.target);

    let movieId = document.getElementById(event.target.id);
    let yearItem = movieId.getElementsByClassName('year');
    let runtimeItem = movieId.getElementsByClassName('runtime');

    // should switch display to visible
    yearItem.css({'display':"visible"});
    runtimeItem.css({'display':"visible"});
  }

  handleSubmit(event) {
    event.preventDefault();

    let title = this.state.titleValue;
    let year = this.state.yearValue;
    let runtime = this.state.runtimeValue;

    let newItem = <div key={title} id={title}>
      <p className="title" onClick={this.showDescription} id={title}>{title}</p>
      <button className="watchButton" onClick={this.toggleWatched} >{this.state.watchedValue}</button>
      <p className="year" style={{display:'none'}}>Year: {year}</p>
      <p className="runtime" style={{display:'none'}}>Runtime: {runtime}</p>
    </div>;

    this.setState({
      titleValue: '',
      yearValue: '',
      runtimeValue: '',
      allMoviesList: [...this.state.allMoviesList, newItem], unwatchedMovies: [...this.state.unwatchedMovies, newItem]
    });

  }

  //DOESNT WORK
  toggleWatched(event) {
    // event.preventDefault();
    this.setState({ toggleButton: 'Watched' });

  }

  handleSearchChange(event) {
    // event.preventDefault();
    this.setState({ searchValue: event.target.value });
  }

  handleTitleChange(event) {
    // event.preventDefault();
    this.setState({ titleValue: event.target.value });
  }

  handleYearChange(event) {
    // event.preventDefault();
    this.setState({ yearValue: event.target.value });
  }

  handleRuntimeChange(event) {
    // event.preventDefault();
    this.setState({ runtimeValue: event.target.value });
  }

  handleWatched(event) {
    event.preventDefault();
    this.setState({ displayedMovies: this.state.watchedMovies });

  }

  handleToWatch(event) {
    event.preventDefault();

    this.setState({ displayedMovies: this.state.unwatchedMovies });

  }

  render() {

    return (
      <div>

        <div id="searchBar">
          <form onSubmit={this.handleSearch} >
            <input type="text" value={this.state.searchValue} onChange={this.handleSearchChange} />
            <input type="submit" value="Search" />
          </form>
        </div>

        <div id="searchList">
          <ul>
            {this.state.searchedMoviesList}
          </ul>
        </div>

        <div id="addMovie">
          <form onSubmit={this.handleSubmit} >
            <p>Title: <input type="text" value={this.state.titleValue} onChange={this.handleTitleChange} /></p>
            <p>Year: <input type="text" value={this.state.yearValue} onChange={this.handleYearChange} /></p>
            <p>Runtime:  <input type="text" value={this.state.runtimeValue} onChange={this.handleRuntimeChange} /></p>
            <input type="submit" value="Add Movie" />
          </form>
        </div>

        <div id="allMovies">
          <button onClick={this.handleWatched}>Watched</button>
          <button onClick={this.handleToWatch}>To Watch</button>
          {this.state.displayedMovies}
        </div>

      </div>

    );
  }

}

export default App;