import React, { Component } from 'react'
import axios from 'axios'
import AppContainer from './components/app-container'
import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      isFetching: true,
      candidateType: 'prefeitos'
    }
  }

  handleMenu(type) {
    return (type) => {
      this.setState({
        candidateType: type,
        isFetching: true
      }, () => {
        this.getData()
      })
    }
  }

  componentWillMount() {
    this.getData()
  }

  getData() {
    let candidateCode = (this.state.candidateType === 'prefeitos') ? '11' : '13'
    axios.defaults.headers.post['Access-Control-Allow-Credentials'] = true
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://evil.com/'
    axios.get(`http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/2016/58238/2/${candidateCode}/candidatos/`)
      .then(response => {
        this.setState({
          data: response.data.candidatos
        }, () => {
          this.setState({
            isFetching: false
          })
        })
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else {
          console.log('Error:', error.message);
        }
      })
  }

  render() {
    return (
      <AppContainer
        data={this.state.data}
        isFetching={this.state.isFetching}
        candidateType={this.state.candidateType}
        handleMenu={this.handleMenu(this.state.candidateType)}
      />
    )
  }
}

export default App
