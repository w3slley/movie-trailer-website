import React, { Component } from 'react';
import Poster from './Poster.js';
import Info from './Info.js';
import Trailer from './Trailer.js';
//import {Link} from 'react-router-dom';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class Movie extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataFetched: false,
      movieData: '',
      movieRatings: [],
      errors: []
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.match.params.movieId !== this.props.match.params.movieId){
      console.log(this.props.match.params.movieId);
      this.getMovie(this.props.match.params.movieId);
    }
  }
  
  componentDidMount(){
    console.log(this.props.match.params.movieId);
    this.getMovie(this.props.match.params.movieId);
  }

  getMovie(movieId){
    fetch(`http://localhost:8000/movies/${movieId}`)
    .then(response => response.json())
    .then(data => {
      this.setState({dataFetched: true});
      if(data.Response === 'True'){
        this.setState({movieData: data});
        this.setState({movieRatings: data.Ratings});
      }
      else if(data.status === 'failed'){
        this.setState({errors: data.message})
      }
      else{
        //add error handlers later
      }
    });
  }

  goBack(){ 
    this.props.history.goBack();
  }
  render() { 
    return ( 
      <>
        {!this.state.dataFetched? 
        <Loader 
          type="TailSpin"
          color="#262626" 
          height={80} 
          width={80} 
        />  : ''}
        {this.state.dataFetched && this.state.errors.length === 0 ?
        <div>
          <Poster url={this.state.movieData.Poster} />
          <Info data={this.state.movieData} raitings={this.state.movieRaitings} />
          <Trailer youtubeId={this.state.movieData.YoutubeId} />
          <a target='_blank' rel="noreferrer" href={`https://imdb.com/title/${this.state.movieData.imdbID}`}>View on IMDB</a>
          <br />
          <button onClick={()=>this.goBack()}>Go back</button>
        </div>
        :
        <p>{this.state.errors}</p>
        }
      </>
    );
  }
}


export default Movie;