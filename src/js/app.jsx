import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// input creator, will create all labels and drop downs if value is present
class Output extends Component {
  render() {
    const { label, dropDown, name, type, step } = this.props;
    // set label element and html text
    const createLabel = (
      <label htmlFor='user-input' className='col-sm-2 col-form-label fs-5' placeholder={ '0' }>
        {label}
      </label>
    );

    // if dropDown has no value return default input field with label
    if (!dropDown) {
      const userInput = (
        <input
          className='form-control form-control-lg'
          name={ name }
          type={ type }
          step={ step || undefined }
        />
        );

      return (
        <div className='for-group row'>
          {createLabel}
          <div className='col-sm-10'>
            { userInput }
          </div>
        </div>
      );
    }

    // creates each drop down option
    const drop = dropDown.map((option, num) => <option key={ num }>{ option }</option>);

    // if dropDown has value return drop down with label
    return (
      <div className='for-group row'>
        {createLabel}
        <div className='col-sm-10'>
          <select className='form-control form-control-lg' id='term'>
            {drop}
          </select>
        </div>
      </div>
    );
  }
}

Output.propTypes = {
  label: PropTypes.string.isRequired,
  dropDown: PropTypes.arrayOf(PropTypes.number),
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  step: PropTypes.number,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.outputRef = React.createRef();
    this.calculateMonthly = this.calculateMonthly.bind(this);
  }

  calculateMonthly(event) {
    event.preventDefault();

    const form = this.formRef.current;
    const balance = parseFloat(form.balance.value);
    const rate = parseFloat(form.rate.value) / 100;
    const term = form.term.value;

    if (isNaN(balance) || isNaN(rate) || isNaN(term)) {
      this.outputRef.current.textContent = 'Please provide valid inputs.';
      return;
    }

    const months = term * 12;
    const monthlyInt = rate / 12;

    const top = monthlyInt * Math.pow((1 + monthlyInt), months);
    const bottom = Math.pow((1 + monthlyInt), months) - 1;

    const monthlyPayment = balance * (top / bottom);

    this.outputRef.current.textContent = `Monthly Patment: $${monthlyPayment.toFixed(2)}`;
  }

  render() {
    return (
      <div>
        <form
          className='container mt-5 w-50'
          ref={ this.formRef }
          onSubmit={ this.calculateMonthly }
        >
          <h1 className='mb-5 align-center'>Mortgage Calculator</h1>

          <Output label={ 'Loan Amount' } name='balance' type='number' />
          <Output label={ 'Interest Rate (%)' } name='rate' type='number' step={ 0.01 } />
          <Output label={ 'Loan Term (years)' } name='term' dropDown={ [15, 30] } />

          <button className='btn btn-primary btn-lg' name='submit'>Calculate</button>
        </form>

        <div className='display mt-4 text-center' id='output' ref={ this.outputRef } />
      </div>
    );
  }
}

export default App;
