import React from 'react';
import {observer} from 'mobx-react';
import {observable, action} from 'mobx';
import {Button, ButtonToolbar, FormControl} from 'react-bootstrap';
import RoutingManager from '../RoutingManager.js';


// http://stackoverflow.com/a/1349462/315168
function randomString(len, charSet) {
  charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var randomString = '';
  for (var i = 0; i < len; i++) {
    var randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
}

function RoutingEditor({companyDetails, manager}) {

  let routingTable = manager.getRoutingTable();

  console.log("RoutingEditor", companyDetails.addresses, companyDetails.preferences, routingTable);

  return (
    <div>
      <table className="table">
        <thead>
        <tr>
          <th>Address</th>
          <th>Operator</th>
          <th className="text-center">Enabled</th>
          <th className="text-center">Default*</th>
          <th className="text-center">Tax preferential**</th>
        </tr>
        </thead>
        <tbody>
        {routingTable.map(function (entry) {

          function toggleEnabled(e) {
            manager.setEnabled(entry.address, !entry.isEnabled);
          }

          function toggleDefault() {
            manager.setDefault(entry.address);
          }

          function toggleTax() {
            manager.setTaxPreferential(entry.address);
          }

          return (
            <tr key={entry.address}>
              <td>
                {entry.address}
              </td>

              <td>
                {entry.operatorName}
              </td>

              <td className="text-center">
                <input type="checkbox" checked={entry.isEnabled} onChange={toggleEnabled}/>
              </td>

              <td className="text-center">
                <input name="default" type="radio" checked={entry.isDefault} onChange={toggleDefault}/>
              </td>

              <td className="text-center">
                <input name="tax" type="radio" checked={entry.isTax} onChange={toggleTax}/>
              </td>

            </tr>
          );
        })}
        </tbody>
      </table>

      <p>
        <strong>Default*:</strong> All company invoicing should be received to this address, unless otherwise specified.
      </p>

      <p>
        <strong>Tax preferential**:</strong> Tax related invoicing should be received to this address, unless otherwise specified.
      </p>

    </div>
  );

}

RoutingEditor = observer(RoutingEditor);


function CompanyDetails({store, manager}) {
  let company = store.editCompanyDetails;

  console.log("Rendering company details", company, store, manager);
  if (!store.editCompanyVatId) {
    return (<h1>Loading... <i className="fa fa-spin fa-spinner"/></h1>);
  }

  if (company.businesInformation && !company.businessInformation.name) {
    return (<h1>{store.loggedInVatId} No company data available</h1>);
  }

  return (
    <div>
      <h1>{company.businessInformation.name}</h1>
      <p><strong>VAT id:</strong> {company.vatId}</p>
      {manager &&
      <RoutingEditor companyDetails={company} manager={manager}/>
      }
    </div>
  );
}

CompanyDetails = observer(CompanyDetails);


class UpdatedDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.store = props.store;
    this.resetState();
  }

  resetState() {
    console.log("State reset");
    this.state = observable({
      ready: false,
      saving: false,
      updated: false,
      newAddress: null,
      manager: null,
    });
  }

  buildRoutingTable() {
    let company = this.store.editCompanyDetails;
    this.state.manager = new RoutingManager(company.addresses, company.preferences);
  }

  componentDidMount() {
    this.store.loadCompanyDetails(this.store.loggedInVatId);
    let company = this.store.editCompanyDetails;
    this.buildRoutingTable();
  }

  componentWillUnmount() {
    this.resetState();
  }

  render() {

    let logout = () => this.store.logout();
    let editable = this.store.editCompanyVatId;
    let state = this.state;
    let store = this.store;
    let manager = this.state.manager;
    let savingLabel = state.saving && "Saving" || "Save";
    let operationInProgress = state.saving || state.creating;
    let loading = !this.store.editCompanyVatId;
    let buildRoutingTable = this.buildRoutingTable.bind(this);

    function resetInfo() {
      state.creating = false;
      state.saving = false;
      state.updated = false;
      state.newAddress = null;
    }

    function save() {
      console.log("Save");

      resetInfo();

      function cb(success) {
        console.log("callback", success);

        if (success) {
          store.loadCompanyDetails(store.loggedInVatId);
          buildRoutingTable();
          state.updated = true;
        } else {
          alert("Saving failed");
        }

        state.saving = false;
      }

      state.saving = true;
      store.contractWrapper.updateRoutingPreference(store.editCompanyVatId, manager.getCompanyPreferencesJSON(), cb);
    }

    /** Create new addresses */
    function createAddress() {
      let address = "IBAN:XE81ETHX" + randomString(7);

      resetInfo();

      console.log("Creating address", address);

      function cb(success) {
        console.log("Address creation TX", success);

        if (success) {
          state.newAddress = address;
        } else {
          alert("Creation failed");
        }

        state.creating = false;
        store.loadCompanyDetails(store.loggedInVatId);
        buildRoutingTable();
      }

      cb = action(cb);

      function delayed() {
        store.contractWrapper.createAddress(store.editCompanyVatId, address, cb)
      }

      state.creating = true;
      setTimeout(delayed, 1);
    }
    createAddress = action(createAddress);

    console.log("Rendering ", state);

    return (
      <div>
        {state.updated && <div className="alert alert-info">Company preferences updated</div>}

        {state.newAddress && <div className="alert alert-info">Created new address: {state.newAddress}</div>}

        <CompanyDetails store={store} manager={manager}/>

        {!loading &&
        <ButtonToolbar>
          {editable && <Button className="btn btn-primary" onClick={save} disabled={operationInProgress}>
            {savingLabel}
          </Button>
          }
          {editable && <Button className="btn btn-primary" onClick={createAddress} disabled={operationInProgress}>
            Create new address
          </Button>
          }

          <Button className="btn btn-primary" onClick={logout} disabled={operationInProgress}>
            Log out
          </Button>

          <div id="update-dashboard-spinner">
            {operationInProgress && <i className="fa fa-spin fa-spinner fa-2x"/>}
          </div>
        </ButtonToolbar>
        }
      </div>
    );
  }
}


UpdatedDashboard.propTypes = {
  store: React.PropTypes.object
};

export default observer(UpdatedDashboard);
