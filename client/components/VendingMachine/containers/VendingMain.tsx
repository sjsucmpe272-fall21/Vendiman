import React from 'react'
import { Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { connect } from 'react-redux'
import axios from 'axios';

import { VendingTypes } from '../../../../shared/VendingTypes';
import { Items } from '../components/items';
import { pay, confirmPayment, cancelPayment } from '../actions';
import { VendingMachineState } from '../store';

interface Props {
  items: VendingTypes.Item[];
  basket: VendingTypes.Item[];
  modal: boolean;
}

const mapStateToProps = (store: {
  items: VendingMachineState
}) => ({
    items: store.items.list, 
    basket: store.items.basket,
    modal: store.items.modal
  })

class VendingMain extends React.Component<Props> {
  state = { modal: false }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render () {
    const { items, basket, modal } = this.props

    let totalAmount = basket.reduce((acc, item) => { return acc + item.price * (item.count ?? 0) }, 0) 

    return (
      <Container>
        <h1 className="text-center mt-5">Online vending machine</h1>
        <Row className="my-5">
          <Col md={ 8 } className="border py-2">
            <h2 className="text-center">Items list</h2>
            <Items items={ items } />
          </Col>
          <Col md={ 4 } className="basket border py-2">
            <h2 className="text-center">Basket</h2>
            <Items items={ basket } />
            <p className="text-center">Total: <b>€{ totalAmount }</b></p>
            <Button color="success" onClick={ pay }>Pay</Button>
          </Col>
        </Row>
        
        <Modal isOpen={ modal } toggle={ cancelPayment }>
          <ModalHeader toggle={ cancelPayment }>Payment provider</ModalHeader>
          <ModalBody>
            Please confirm your payment of <b>€{ totalAmount }</b>.
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={ confirmPayment }>Confirm</Button>
            { ' ' }
            <Button onClick={ cancelPayment }>Cancel</Button>
          </ModalFooter>
        </Modal>
      </Container>
    )
  }
}

export const Vending = connect(mapStateToProps)(VendingMain);