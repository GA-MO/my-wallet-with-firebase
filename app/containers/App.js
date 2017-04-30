
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Helmet from 'react-helmet'
import { AppHeader } from '../components'
import Home from './Home'
import Category from './Category'
import Overview from './Overview'
import Login from './Login'
import firebase from '../../configs/firebase'

class App extends React.Component {
  state = {
    page: 'home',
    category: null,
    itemList: null,
    user: null,
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: user,
          page: 'home',
        })
        this.fetchData(user.email)
      } else {
        this.setState({
          page: 'login',
        })
      }
    })
  };

  onChangePage = (pageActive) => {
    this.setState({ page: pageActive })
  };

  fetchData = (userName) => {
    firebase.database().ref().child('category').on('value', (data) => {
      this.setState({
        category: data.val(),
      })
    })
    firebase.database().ref().child('itemlists')
      .orderByChild('user')
      .startAt(userName)
      .endAt(userName)
      .on('value', (data) => {
        this.setState({
          itemList: this.convertObjectToArray(data.val()),
        })
      });
    // firebase.database().ref().child('itemlists').on('value', (data) => {
    //   this.setState({
    //     itemList: this.convertObjectToArray(data.val()),
    //   })
    // })
  }

  convertObjectToArray = (items) => {
    const itemList = []
    for (const key in items) {
      const item = {}
      for (const key2 in items[key]) {
        item[key2] = items[key][key2]
      }
      itemList.push(item)
    }
    return itemList;
  };

  render() {
    const { page, category, itemList, user } = this.state
    let pageComponent = '';
    switch (page) {
      case 'home':
        pageComponent = (<Home user={user} categoryList={category} itemList={itemList} />)
        break;
      case 'category':
        pageComponent = (<Category categoryList={category} />)
        break;
      case 'overview':
        pageComponent = (<Overview categoryList={category} itemList={itemList} />)
        break;
      case 'login':
        pageComponent = (<Login fetchData={this.fetchData} />)
      default: break;
    }
    return (
      <div>
        <Helmet title="My Wallet" />
        <br />
        {
          page !== 'login' &&
          <div className="container">
            <AppHeader user={user} pageActive={page} onChangePage={this.onChangePage} />
            <br />
          </div>
        }
        {pageComponent}
      </div>
    )
  }
}

export default App
