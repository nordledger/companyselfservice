import React from 'react';
import { observer } from 'mobx-react';
import { Button } from 'react-bootstrap';
import { observable } from 'mobx';


function Results({ store }) {

  if(!store.resultVatId) {
    return (<p>Example companies include: IBAN:FI6213763000140986, OVT:3726597538, FI24303727, FI26597538, {store.resultVatId}</p>);
  } else {
    var text = JSON.stringify(store.results, null, 2);
    var vatId = store.resultVatId;
    return (
      <div>
        <h2>Results for {vatId}</h2>
        <pre>{text}</pre>
      </div>
    );
  }
}

Results = observer(Results);


function Search({ store }) {

  var state = observable({});

  function searchByVat(e) {
    store.queryByVatId(state.vatId);
    window.location.hash = "#results";
  }

  function searchByInvoiceAddress(e) {
    store.queryByInvoiceAddress(state.invoiceAddress);
    window.location.hash = "#results";
  }

  function onChange(event) {
    state[event.target.name] = event.target.value;
  }

  function reset() {
    store.results = null;
    store.resultVatId = null;
  }

  return (
    <div>
      <h1>Search electronic invoice address registry</h1>

      <form>
        <div className="form-group">

          <label htmlFor="query-invoicing-address">Invoicing address (OVT/IBAN)</label>
          <input type="text" className="form-control" name="invoiceAddress" placeholder="OVT:3724303727" value={state.invoiceAddress} onChange={onChange} />

        </div>
        <button id="btn-query-address" type="button" className="btn btn-primary" onClick={searchByInvoiceAddress}>Search</button>
        &nbsp;
        <button type="button" className="btn btn-primary" onClick={reset}>Reset</button>
      </form>

      <hr />

      <form>
        <div className="form-group">
          <label htmlFor="query-vat-id">VAT id</label>
          <input type="text" className="form-control" name="vatId" placeholder="FI24303727" value={state.vatId} onChange={onChange} />
        </div>
        <button id="btn-query-vat-id" type="button" className="btn btn-primary" onClick={searchByVat}>Search</button>
        &nbsp;
        <button type="button" className="btn btn-primary" onClick={reset}>Reset</button>
      </form>

      <hr />

      <a name="results" />

      <Results store={store} />
    </div>
  );
}

Search.propTypes = {
  store: React.PropTypes.object,
  state: React.PropTypes.object,
};

export default observer(Search);
