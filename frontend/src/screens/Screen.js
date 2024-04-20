import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'

const Screen = () => {
  return (
    <>
      <Container id='board' variant='dark' className='text-center'>
        <Row>
          <Col className='box' id='0'></Col>
          <Col className='box' id='1'></Col>
          <Col className='box' id='2'></Col>
          <Col className='box' id='3'></Col>
        </Row>
        <Row>
          <Col className='box' id='4'></Col>
          <Col className='box' id='5'></Col>
          <Col className='box' id='6'></Col>
          <Col className='box' id='7'></Col>
        </Row>
        <Row>
          <Col className='box' id='8'></Col>
          <Col className='box' id='9'></Col>
          <Col className='box' id='10'></Col>
          <Col className='box' id='11'></Col>
        </Row>

        <Row>
          <Col className='box' id='12'></Col>
          <Col className='box' id='13'></Col>
          <Col className='box' id='14'></Col>
          <Col className='box' id='15'></Col>
        </Row>
      </Container>
    </>
  )
}

export default Screen
