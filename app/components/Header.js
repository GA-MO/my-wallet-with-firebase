import React, { Component, PropTypes } from 'react'
import { Menu, Segment, Dropdown } from 'semantic-ui-react'
import firebase from '../../configs/firebase'

export default class MenuExampleInvertedSegment extends Component {
  static propTypes = {
    pageActive: PropTypes.string.isRequired,
    onChangePage: PropTypes.func.isRequired,
  };

  onLogout = () => {
    firebase.auth().signOut().then(() => {
      console.log('Signed Out');
      this.props.onChangePage('login')
    }, (error) => {
      console.error('Sign Out Error', error);
    });
  }

  handleItemClick = (e, { name }) => this.props.onChangePage(name);

  render() {
    const { pageActive, user } = this.props
    console.log('page', pageActive)
    return (
      <Segment inverted>
        <Menu inverted secondary>
          <Menu.Item name='home' active={pageActive === 'home'} onClick={this.handleItemClick} />
          <Menu.Item name='category' active={pageActive === 'category'} onClick={this.handleItemClick} />
          <Menu.Item name='overview' active={pageActive === 'overview'} onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
            <Dropdown item text={user && user.email}>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => this.onLogout()}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>
      </Segment>
    )
  }
}