import React    from 'react'
import { Link } from 'react-router-dom'
import styled   from 'styled-components'


/* <----------- styled components -----------> */
const Wrapper = styled.div`
`
const HeaderBackground = styled.div`
  background-image: url('https://i.imgur.com/keKDODv.jpg?1');
  background-size: cover;
  background-position: top;
  height: 26em;
`
const ShadeBackground = styled.div`
    background-color: rgba(0,0,0,0.5);
    width: 100%;
    height: 81%;
    position: absolute;
    -webkit-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    top: 5%;
    left: 50%;
`
const Main = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  transform: translate(0, 10%);
  font-size: 2em;
`
/* <-----------------------------------------> */


const Dashboard = ( props ) => {
  return (
    <Wrapper>
      <HeaderBackground>
      <ShadeBackground/>
        <Main>
          <h2>Welcome arrick123</h2>
          <h1>Today is Monday | 13:21:12</h1>
          <Link to="/workouts"><h1>My Workouts</h1></Link>
        </Main>
      </HeaderBackground>
    </Wrapper>
  )
}

export default Dashboard