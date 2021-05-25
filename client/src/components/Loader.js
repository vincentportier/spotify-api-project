import React from "react";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const charging = keyframes`
from {
height:1px;
}
to {
height:100%;
}
`;

const Bars = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
  min-width: 100px;
  height: 50px;
  margin: 0 auto;
  z-index: 2;
  position: relative;
  left: 0;
  right: 0;
`;
const Bar = styled.div`
  width: 10px;
  margin: 0 2px;
  height: 5px;
  background: ${(props) => props.color || "orangered"};
  animation-name: ${charging};
  animation-play-state: running;
  animation-duration: 400ms;
  animation-direction: alternate;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-delay: ${(props) => props.delay};
`;
export const Loader = () => {
  return (
    <Container>
      <Bars>
        <Bar delay="250ms" color="#F88216" />
        <Bar delay="505ms" color="#EB6533" />
        <Bar delay="75ms" color="#B7356C" />
        <Bar delay="0ms" color="#214DC1" />
        <Bar delay="330ms" color="#1CA95E" />
      </Bars>
    </Container>
  );
};
