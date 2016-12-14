import React from 'react';
import { observer } from 'mobx-react';
import { Button, ButtonToolbar, FormControl } from 'react-bootstrap';
import RoutingManager from '../RoutingManager.js';


function RoutingEditor({companyDetails}) {

  console.log("Editor", companyDetails.addresses, companyDetails.preferences);

  let manager = new RoutingManager(companyDetails.addresses, companyDetails.preferences);
  let routingTable = manager.getRoutingTable();

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Address</th>
            <th>Operator</th>
            <th className="text-center">Enabled</th>
            <th className="text-center">Default</th>
            <th  className="text-center">Tax preferential</th>
            <th>Notes*</th>
          </tr>
        </thead>
        <tbody>
          {routingTable.map(function(entry) {
            return (
              <tr key={entry.address}>
                <td>
                  {entry.address}
                </td>

                <td>
                  {entry.operatorName}
                </td>

                <td className="text-center">
                  <input type="checkbox" />
                </td>

                <td className="text-center">
                  <input name="default" type="radio" />
                </td>

                <td className="text-center">
                  <input name="tax" type="radio" />
                </td>

                <td>
                  <FormControl type="text" />
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="text-muted">
        * public notes, available to anybody read in international electronic invoicing registry
      </p>
    </div>
  );

}

RoutingEditor = observer(RoutingEditor);


function CompanyDetails({store}) {
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
      <h1>Update {company.businessInformation.name}</h1>
      <p><strong>VAT id:</strong> {company.vatId}</p>
      <RoutingEditor companyDetails={company} />
    </div>
  );
}

CompanyDetails = observer(CompanyDetails);


class UpdatedDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.store = props.store;
    console.log("constructor", props.store)
  }

  componentDidMount() {
    this.store.loadCompanyDetails(this.store.loggedInVatId);
  }

  render() {

    let logout = () => this.store.logout();
    let editable = this.store.editCompanyVatId;

    return (
      <div>
        <CompanyDetails store={this.store}/>
        <ButtonToolbar>
          {editable && <Button className="btn btn-primary" onClick={logout}>
            Save
          </Button>
          }
          {editable && <Button className="btn btn-primary" onClick={logout}>
            Create new address
          </Button>
          }

          <Button className="btn btn-primary" onClick={logout}>
            Log out
          </Button>
        </ButtonToolbar>
      </div>
    );
  }
}


UpdatedDashboard.propTypes = {
  store: React.PropTypes.object,
};

export default observer(UpdatedDashboard);
