import {Component} from 'react';
import {Link} from 'react-router-dom';

class Welcome extends Component {
  state = {  }
  render() { 
    return (
      <section className="mt-5 text-center">
        <div className="container">
          <h1 className="jumbotron-heading">Welcome to Kino</h1>
          <p className="lead text-muted">Here you can find out more about the movies you love!</p>
          <p>
            <Link to="/search" className="btn btn-secondary my-2">Search movies</Link>
          </p>
        </div>
      </section>
    );
  }
}
 
export default Welcome;