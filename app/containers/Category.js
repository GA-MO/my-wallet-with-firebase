import React from 'react'
import firebase from '../../configs/firebase'
import { Button, Modal, Icon, Table, Select, Input } from 'semantic-ui-react'

export default class Category extends React.Component {
  addCategory = (e) => {
    const { user } = this.props
    const categoryName = e.target.value
    const categoryKey = categoryName.toLowerCase().replace(' ', '-')
    if (e.keyCode === 13) {
      const catId = `${categoryKey}-${Date.now()}`
      firebase.database().ref(`categories/${catId}`).set({
        name: categoryName,
        user_id: user.uid
      })
      e.target.value = ''
    }
  }

  deleteCategory = (categoryKey) => {
    firebase.database().ref(`categories/${categoryKey}`).remove()
  }

  render () {
    const { categoryList } = this.props
    const categoryComponent = []
    for (const key in categoryList) {
      const category = categoryList[key]
      categoryComponent.push(
        <Table.Row key={category.id}>
          <Table.Cell collapsing>{`${category && category.name}`}</Table.Cell>
          <Table.Cell collapsing textAlign='right'>
            <Button onClick={() => this.deleteCategory(key)}>delete</Button>
          </Table.Cell>
        </Table.Row>
      )
    }
    return (
      <div className='container'>
        <div className='row'>
          <div className='D-6'>
            <Table celled striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan='3'>Category</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>{categoryComponent}</Table.Body>
            </Table>
          </div>
          <div className='D-6'>
            <Input
              fluid
              placeholder='Add Category'
              onKeyUp={(e) => this.addCategory(e)}
            />
          </div>
        </div>
      </div>
    )
  }
}
