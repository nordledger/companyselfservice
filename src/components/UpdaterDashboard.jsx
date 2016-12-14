import React from 'react';
import { observer } from 'mobx-react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import RoutingManager from '../RoutingManager.js';


function RoutingEditor({companyDetails}) {

  console.log("Editor", companyDetails.addresses, companyDetails.preferences);

  let manager = new RoutingManager(companyDetails.addresses, companyDetails.preferences);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Address</th>
          <th>Operator</th>
          <th>Default</th>
          <th>Enabled</th>
          <th>Tax preferential</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(manager.addresses).map(function(tuple) {
          let [address, data] = tuple;
          return (
            <tr key={address}>
              <td>
                {address}
              </td>

              <td>
                {data.operatorName}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
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

    return (
      <div>
        <ButtonToolbar>
          <Button className="btn btn-primary" onClick={logout}>
            Log out
          </Button>
        </ButtonToolbar>
        <CompanyDetails store={this.store}/>
      </div>
    );
  }
}


UpdatedDashboard.propTypes = {
  store: React.PropTypes.object,
};

export default observer(UpdatedDashboard);
