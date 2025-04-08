import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllScores, listMyGames } from "../actions/scoreActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const GameList = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const scoreList = useSelector((state) => state.scoreList);
  const { loading, error, scores } = scoreList;

  useEffect(() => {
    if (userInfo) dispatch(listMyGames(userInfo._id));
  }, [dispatch, userInfo]);

  const clearAll = () => {
    if (window.confirm("are you sure")) dispatch(deleteAllScores(userInfo._id));
  };
  return (
    <Container fluid>
      <Row>
        <Col className="m-2">
          <h2 className="text-center">My Score</h2>

          <button
            className="btn btn-primary m-4"
            onClick={() => {
              clearAll();
            }}
          >
            clear All
          </button>

          {loading ? (
            <Loader />
          ) : error ? (
            <Message>{error}</Message>
          ) : (
            <h2>
              {scores.map((score, index) => (
                <div key={index}>
                  Score {index + 1}: <span>{score}</span>
                </div>
              ))}
            </h2>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default GameList;
