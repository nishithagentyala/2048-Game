import React, { useEffect } from 'react'
import { Row, Col, Table, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteAllScores,
  deleteScore,
  listMyGames,
} from '../actions/scoreActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const GameList = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const scoreList = useSelector((state) => state.scoreList)
  const { loading, error, scores } = scoreList

  const scoreDelete = useSelector((state) => state.scoreDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = scoreDelete

  const scoreDeleteAll = useSelector((state) => state.scoreDeleteAll)
  const {
    loading: loadingAllDel,
    error: errorDelAll,
    success: successAllDelete,
  } = scoreDeleteAll

  useEffect(() => {
    if (userInfo) dispatch(listMyGames())
  }, [dispatch, userInfo, successDelete, successAllDelete])

  const deleteHandler = (id) => {
    if (window.confirm('are you sure')) dispatch(deleteScore(id))
  }
  const clearAll = () => {
    if (window.confirm('are you sure')) dispatch(deleteAllScores())
  }
  return (
    <Container fluid>
      <Row>
        <Col className='m-2'>
          <h2 className='text-center'>My Games</h2>
          {loadingAllDel && <Loader />}
          {errorDelAll && <Message>{errorDelAll}</Message>}
          <button
            className='btn btn-primary m-2'
            onClick={() => {
              clearAll()
            }}
          >
            clear All
          </button>
          {loadingDelete && <Loader />}
          {errorDelete && <Message>{errorDelete}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message>{error}</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead className='text-center'>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>SCORE</th>
                  <th>BEST SCORE</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {scores.map((score) => (
                  <tr key={score._id}>
                    <td>{score._id}</td>
                    <td>
                      {score.createdAt
                        ? score.createdAt.substring(0, 10)
                        : null}
                    </td>
                    <td>{score.s}</td>
                    <td>{score.best}</td>
                    {loadingDelete && <Loader />}
                    {errorDelete && <Message>{errorDelete}</Message>}
                    <td>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => {
                          deleteHandler(score._id)
                        }}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default GameList
