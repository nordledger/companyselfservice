import React from 'react';
import { observer } from 'mobx-react';
import { Button } from 'react-bootstrap';

import Home from './Home';
import { Tabs, Tab, Grid, Row, Col } from 'react-bootstrap';


function Main({ store }) {

  const chooseTab = store.updateTab.bind(store);

  return (
      <Grid>
        <Row>
          <Col md={12}>

            <Tabs activeKey={store.tab} onSelect={chooseTab} id="controlled-tab-example">
              <Tab eventKey="home" title="Home">
                <Home />
              </Tab>
              <Tab eventKey="search" title="Search companies">Tab 2 content</Tab>
              <Tab eventKey="update" title="Update company information">Tab 3 content</Tab>
            </Tabs>

           </Col>
        </Row>
      </Grid>
  );
}

Main.propTypes = {
  store: React.PropTypes.object,
};

export default observer(Main);
