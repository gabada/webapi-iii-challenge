import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      posts: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8000/api/users')
      .then(res => {
        this.setState({ users: res.data });
        console.log('USERS', this.state.users);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className='App'>
        {this.state.users.map(user => {
          return (
            <div key={user.name}>
              <p>
                {user.id}
                <br />
                {user.name}
              </p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
