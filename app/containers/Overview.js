import React from 'react'
import firebase from '../../configs/firebase'
import { Button, Modal, Icon, Table, Select, Input, Statistic } from 'semantic-ui-react'
import { BuyList } from '../components'

export default class Overview extends React.Component {

  setUpDataToView = () => {

  }

  getDataFromItems = (func) => {

  }

  getItemByKey = () => {

  }

  getTotalByCategory = (categoryId, itemList) => {
    const itemWithCat = itemList.filter(item => item.category_id === categoryId);
    console.log('ddd', itemWithCat)
    return itemWithCat && itemWithCat.reduce((sum, item) => sum + Number(item.price), 0) || 0
  }

  getTotalPrice = (categoryList, itemList) => {
    let total = 0;
    for (const key in categoryList) {
      total = total + this.getTotalByCategory(key, itemList);
    }
    return total;
  }

  render() {
    const { categoryList, itemList } = this.props
    const totalPrice = this.getTotalPrice(categoryList, itemList)
    const categoryComponent = []
    for (const key in categoryList) {
      const category = categoryList[key];
      categoryComponent.push(
        <Table.Row className={`${this.getTotalByCategory(key, itemList) === 0 && '_hide'}`}>
          <Table.Cell collapsing>
            {`${category && category.name}`}
          </Table.Cell>
          <Table.Cell collapsing textAlign='right'>
            {this.getTotalByCategory(key, itemList)}
          </Table.Cell>
        </Table.Row>
      )
    }
    return (
      <div className="container">
        <div className="_center">
          <Statistic>
            <Statistic.Value>{totalPrice}</Statistic.Value>
            <Statistic.Label>Total Price</Statistic.Label>
          </Statistic>
        </div>
        <br />
        <br />
        <div className="row">
          <div className="D-6">
            <BuyList title="Item list" itemList={itemList} />
          </div>
          <div className="D-6">
            <Table celled striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan='3'>Category</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {categoryComponent}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}
