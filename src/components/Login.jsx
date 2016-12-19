import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Button } from 'react-bootstrap';
import logo from '../../images/katso-logo.jpg';


function Login({ store }) {

  let state = observable({});

  let login = () => store.login(state.vatId);
  let onChange = (event) => state[event.target.name] = event.target.value;

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <div className="text-center">
          <img src={logo} />
        </div>
      </div>

      <form className="panel-body">

        <p>
          Log in to update your company electronic invoicing address details.
        </p>

        <div className="form-group">
          <label htmlFor="vatId">VAT id</label>
          <input className="form-control" name="vatId" type="text" onChange={onChange} value={state.vatId} placeholder="FI01234567" pattern="^FI\d{8}$" required title="VAT id in international format"/>
        </div>

        <Button className="btn-block btn-lg btn-primary" onClick={login}>
          Log in
        </Button>
      </form>

      <div className="panel-footer">
        <p className="text-muted text-center">
          In this demo no real login is performed - you can log in as any company. Example: FI26597538.
        </p>
      </div>
    </div>
  );
}

Login.propTypes = {
  store: React.PropTypes.object,
};

export default observer(Login);
