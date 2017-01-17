import React from 'react';
import {observer} from 'mobx-react';
import {observable, action} from 'mobx';
import {Button, ButtonToolbar, FormControl, Row, Col} from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import {waitTx} from "../utils";


@observer
class InvoiceList extends React.Component {

  constructor(props) {
    super(props);
    this.invoiceList = props.invoiceList;
  }

  render() {

    let invoiceList = this.invoiceList.slice(0);
    invoiceList.reverse();

    function renderRow(payload, idx) {
      return <tr key={payload.invoiceId}>
        <td>
          {payload.fromName}
        </td>

        <td>
          {payload.createdAt}
        </td>

        <td>
          {payload.amount}
        </td>
      </tr>
    }

    return (
      <div>
        {invoiceList.length == 0 && <p>No invoices yet</p>}
        {invoiceList.length > 0 &&
        <table className="table">
          <thead>
            <tr>
              <th>From</th>
              <th>When</th>
              <th>Amount</th>
            </tr>

          </thead>

          <tbody>
            {invoiceList.map(renderRow)}
          </tbody>
        </table>
        }
      </div>
    );
  }

}


@observer
class InvoicingEditor extends React.Component {
  constructor(props) {
    super(props);
    this.store = props.store;
    this.state = props.state;
  }

  onDrop(acceptedFiles, rejectedFiles) {
    console.log('Accepted files: ', acceptedFiles);
    console.log('Rejected files: ', rejectedFiles);

    let state = this.state;
    let store = this.store;
    let contract = store.contractWrapper.contract;
    let web3 = store.contractWrapper.web3;

    function send() {
      let fromAddress = Object.keys(state.invoiceAddressData.addresses)[0];

      // DEMO: Always send to Adusso Oy
      let toAddress = "OVT:3710948874";
      let invoiceId = "" + Math.random();
      let payload = {
        "fromInvoiceAddress": fromAddress,
        "toInvoiceAddress": toAddress,
        "fromVatId": store.editCompanyVatId,
        "fromName": "Demo Company " + store.editCompanyVatId,
        "createdAt": "" + new Date(),
        "amount": Math.floor(Math.random() * 5000 + 1000) + ",00 EUR",
        "invoiceId": invoiceId,
      };

      let from = web3.eth.coinbase;
      let txOptions = {from, gas:500000};

      console.log("TX out options", txOptions);

      let txId = contract.sendInvoice(toAddress, fromAddress, invoiceId, JSON.stringify(payload), txOptions);
      console.log("Got txid", txId);

      function done() {
        state.sentInvoices.push(payload);
        state.sending = false;
      }

      waitTx(web3, txId, done);
    }

    if(acceptedFiles.length > 0) {
      // Don't touch payload, just demo for now
      state.sending = true;
      setTimeout(send, 1);
    }
  }

  render() {

    let onDrop = this.onDrop.bind(this);
    let state = this.state;

    console.log("Got state", state, state.receivedInvoices, state.sentInvoices);

    return (
      <div>
        <Row>
          <Col md={6}>
            <h2>Received invoices</h2>
            <InvoiceList invoiceList={state.receivedInvoices} />
          </Col>

          <Col md={6}>
            <h2>Send new invoice</h2>

            <Dropzone onDrop={onDrop}>
              {!state.sending && <div className="drag-help">→ Drag a new invoice file from accounting application here ←</div>}
              {state.sending && <div className="drag-help">Uploading invoice <i className="fa fa-spin fa-spinner" /></div>}
            </Dropzone>

            <h2>Your invoices</h2>

            <InvoiceList invoiceList={state.sentInvoices} />
          </Col>
        </Row>
      </div>
    );
  }
}


@observer
class InvoicingDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.store = props.store;
    this.resetState();
  }

  resetState() {
    this.state = observable({
      loading: true,
      sending: false,
      vatId: null,
      receivedInvoices: [],
      sentInvoices: [],
      invoiceReceiver: "",
      invoiceAddressData: null, // Our company data
    });
  }

  componentDidMount() {
    let state = this.state;
    let store = this.store;
    let contractWrapper = store.contractWrapper;
    let contract = store.contractWrapper.contract;

    function loadInvoices() {

      let invoiceAddressData = contractWrapper.queryCompanyResultsSync(store.editCompanyVatId);
      console.log("Got data", invoiceAddressData);

      // Our company data
      state.invoiceAddressData = invoiceAddressData;

      for(let address of Object.keys(invoiceAddressData.addresses)) {

        // Get received invoices
        let filter = contract.InvoiceSent({toInvoiceAddress: address}, );
        filter.get(function cb(err, result) {
          console.log("Got received invoices", address, filter, result);
          state.receivedInvoices.push(contract.getInvoice());
        });

        // Get send invoices
        filter = contract.InvoiceSent({fromInvoiceAddress: address});
        filter.get(function cb(err, result) {
          console.log("Got sent invoices", address, filter, result);
        });
      }
      state.loading = false;
    }

    // Trigger load
    setTimeout(loadInvoices, 1);
  }

  render() {

    let state = this.state;
    let store = this.store;

    return (
      <div>
        <h1>Send and receive invoices</h1>

        { state.loading && (<p className="lead">Loading... <i className="fa fa-spin fa-spinner"/></p>) }

        { !state.loading && <InvoicingEditor store={store} state={state} /> }
      </div>
    );
  }
}

InvoicingDashboard.propTypes = {
  store: React.PropTypes.object
};

export default InvoicingDashboard;