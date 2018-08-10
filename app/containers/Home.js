import React from 'react'
import firebase from '../../configs/firebase'
import { Button, Modal, Icon, Header, Select, Input } from 'semantic-ui-react'
import { BuyList } from '../components'

export default class Home extends React.Component {
  state = {
    inputPrice: '',
    inputCategory: ''
  }

  addItem = () => {
    const { inputPrice, inputCategory } = this.state
    const { user } = this.props

    if (inputPrice !== '' && inputCategory !== '') {
      const date = Date.now()
      firebase.database().ref('itemlists/' + date).set({
        category: this.props.categoryList[inputCategory].name,
        category_id: inputCategory,
        date: date,
        price: inputPrice,
        user: user.email,
        user_id: user.uid
      })
      this.setState({
        inputPrice: '',
        inputCategory: ''
      })
    }
  }

  deleteUser = (id) => {
    firebase.database().ref('users/' + id).remove()
  }

  setUpCategory = (categoryList) => {
    const categories = []
    for (const key in categoryList) {
      categories.push({ key: key, text: categoryList[key].name, value: key })
    }
    return categories
  }

  render () {
    const { inputPrice, inputCategory } = this.state
    const { categoryList, itemList } = this.props
    const categorySelect = this.setUpCategory(categoryList)

    return (
      <div className='container'>
        <div className='row'>
          <div className='D-8'>
            <Input
              fluid
              type='number'
              placeholder='Price...'
              size='massive'
              action
            >
              <input
                onChange={(e) => this.setState({ inputPrice: e.target.value })}
                value={inputPrice}
              />
              <Select
                onChange={(e, { value }) =>
                  this.setState({ inputCategory: value })}
                compact
                options={categorySelect}
                placeholder='Category'
                value={inputCategory}
              />
              <Button
                content='Add'
                size='massive'
                color='teal'
                onClick={() => this.addItem()}
              />
            </Input>
          </div>
          <div className='D-4'>
            <BuyList title='Recent Activity' itemList={itemList} maxView={10} />
          </div>
        </div>
      </div>
    )
  }
}
