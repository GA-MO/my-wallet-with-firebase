import React from 'react'
import { Header, Image, Table, Card } from 'semantic-ui-react'
import Moment from 'moment';

const RecentyBuyList = ({ title = 'List item', itemList, maxView = 10000000000 }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {title}
      </Card.Header>
      </Card.Content>
      <Card.Content>
        <Table basic="very" celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              itemList && itemList.map((item, i) => (
                <Table.Row className={`${i >= maxView && '_hide'}`}>
                  <Table.Cell>
                    <Header as='h5'>
                      <Header.Content>
                        {item.category}
                        <Header.Subheader>
                          Date: {Moment(item.date).format('DD MMMM YYYY')}
                        </Header.Subheader>
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>
                    {item.price}
                  </Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
      </Card.Content>
    </Card>
  )
}

export default RecentyBuyList