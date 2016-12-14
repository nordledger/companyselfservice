import React from 'react';
import { observer } from 'mobx-react';
import { Button } from 'react-bootstrap';
import Home from './Home';
import Search from './Search';
import Updater from './Updater';
import { Header, Navbar, Alert, Tabs, Tab, Grid, Row, Col } from 'react-bootstrap';
import logo from '../../images/nordledger-logo.png';

function Main({ store }) {

  const chooseTab = store.updateTab.bind(store);

  if(store.connected) {
    return (
      <Grid>
        <Row>
          <Col md={12}>

              <header>
                <Navbar>
                  <Navbar.Header>
                    <Navbar.Brand>
                      <a href="#"><img className="logo" src={logo} /></a>
                    </Navbar.Brand>
                  </Navbar.Header>
                </Navbar>
              </header>

              <Tabs activeKey={store.tab} onSelect={chooseTab} id="controlled-tab-example">
                <Tab eventKey="home" title="Home">
                  <Home store={store} />
                </Tab>
                <Tab eventKey="search" title="Companies registry">
                  <Search store={store} />
                </Tab>
                <Tab eventKey="update" title="Update your company">
                  <Updater store={store} />
                </Tab>
              </Tabs>
           </Col>
        </Row>
      </Grid>
      );
  } else {
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <Alert>
              Loading
            </Alert>
          </Col>
        </Row>
      </Grid>
    )
  }
}

Main.propTypes = {
  store: React.PropTypes.object,
};

export default observer(Main);
