import React            from 'react'
import { Link }         from 'react-router-dom'
import Clock            from 'react-live-clock'
import styled           from 'styled-components'
import YoutubeComponent from './YoutubeComponent/YoutubeComponent'

/* <----------- styled components -----------> */

const Container = styled.div`
  background-image: url('https://i.imgur.com/y370FSk.jpg');
  background-size: cover;
  height: 100vh;
  overflow: hidden;
`
const HeaderBackground = styled.div`
  background-position: top;
  height: 21em;
  font-family: 'Roboto', sans-serif;
  color: rgb(245, 245, 245);
  a {
    text-decoration: none;
    color: white;
    h1:hover {
      color: orange;
    }
    h1 {
      font-weight: ${props => props.lighter ? 300 : 400};
    }
    h4:hover {
      color: orange;
    }
  }
`
const Main = styled.main`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 2em;
  h1 {
    font-weight: 900;
  }
  .smaller {
    font-weight: 300;
  }
`
const Shader = styled.div`
  height: 100vh;
  background-color: rgb(0, 0, 0, 0.5);
`
/* <-----------------------------------------> */


class Dashboard extends React.Component {
  render() {
    return (
      <Container>
        <Shader>
          <HeaderBackground>
            <Main>
              <h1>Hi {this.props.currentUser.username}</h1>
              {/* <Clock/> is from 'react-live-clock' npm */}
              <Clock className="smaller" format={'dddd, HH:mm:ss'} ticking={true}/>
              <Link to="/workouts">
                <h1 style={{marginLeft: '73px'}}>My Workouts ➞</h1>
              </Link>
              <Link onClick={ () => { this.props.doLogout() } }>
                <h4 style={{marginRight: '67px'}}className="smaller">← Logout</h4>
              </Link>
            </Main>
          </HeaderBackground>

          {/* COMPONENT */}
          <YoutubeComponent />
        </Shader>

      </Container>
    )
  }
}

export default Dashboard