import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Button, ButtonToolbar, FormControl } from 'react-bootstrap';
import RoutingManager from '../RoutingManager.js';


function RoutingEditor({companyDetails, manager}) {

  console.log("Editor", companyDetails.addresses, companyDetails.preferences);

  let routingTable = manager.getRoutingTable();

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
          {routingTable.map(function(entry) {

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
                  <input type="checkbox" checked={entry.isEnabled} onChange={toggleEnabled} />
                </td>

                <td className="text-center">
                  <input name="default" type="radio" checked={entry.isDefault} onChange={toggleDefault} />
                </td>

                <td className="text-center">
                  <input name="tax" type="radio" checked={entry.isTax} onChange={toggleTax} />
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

  console.log("Rendering", company, store);
  if(!store.editCompanyVatId) {
    return (<h1>Loading...</h1>);
  }

  if(company.businesInformation && !company.businessInformation.name) {
    return (<h1>{store.loggedInVatId} No company data available</h1>);
  }

  return (
    <div>
      <h1>{company.businessInformation.name}</h1>
      <p><strong>VAT id:</strong> {company.vatId}</p>
      {manager &&
        <RoutingEditor companyDetails={company} manager={manager} />
      }
    </div>
  );
}

CompanyDetails = observer(CompanyDetails);


class UpdatedDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.store = props.store;
    this.state = observable({
      saving: false,
      updated: false,
    });
    this.manager = null;
  }

  componentDidMount() {
    this.store.loadCompanyDetails(this.store.loggedInVatId);
    let company = this.store.editCompanyDetails;
    this.manager = new RoutingManager(company.addresses, company.preferences);
  }

  render() {

    let logout = () => this.store.logout();
    let editable = this.store.editCompanyVatId;

    let state = this.state;
    let store = this.store;
    let manager = this.manager;
    let savingLabel = state.saving && "Saving" || "Save";
    let operationInProgress = state.saving;

    function save() {
      console.log("Save");

      function cb(success) {
        console.log("callback", success);

        if(success) {
          state.updated = true;
        } else {
          alert("Saving failed");
        }

        state.saving = false;
      }

      state.saving = true;
      store.contractWrapper.updateRoutingPreference(store.editCompanyVatId, manager.getCompanyPreferencesJSON(), cb);
    }

    console.log(state);

    return (
      <div>
        {state.updated && <div className="alert alert-info">Company preferences updated</div>}

        <CompanyDetails store={store} manager={manager} />

        <ButtonToolbar>
          {editable && <Button className="btn btn-primary" onClick={save} disabled={operationInProgress}>
            {savingLabel}
          </Button>
          }
          {editable && <Button className="btn btn-primary" onClick={logout} disabled={operationInProgress}>
            Create new address
          </Button>
          }

          <Button className="btn btn-primary" onClick={logout} disabled={operationInProgress}>
            Log out
          </Button>

          <div id="update-dashboard-spinner">
            {operationInProgress && <i className="fa fa-spin fa-spinner fa-2x" />}
          </div>


        </ButtonToolbar>
      </div>
    );
  }
}


UpdatedDashboard.propTypes = {
  store: React.PropTypes.object
};

export default observer(UpdatedDashboard);
