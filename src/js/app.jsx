import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';

export default function App() {
  return (
    <div className='container'>
      <h1 className='title-test'>Mortgage Calculator</h1>
      <form className='form-container'>
        <div className='row- md'>
          <label htmlFor='top-input'>Loan Balance</label>
          <input className='form-control form-control-lg' type='text' id='top-input'/>
        </div>
        <div className='row-md'>
          <label htmlFor='bottom-input'>Interest Rate (%)</label>
          <input className='form-control form-control-lg' type='text' id='bottom-input' />
        </div>
        <div className='row-md'>
          <label htmlFor='term'>Loan Term</label>
          <select className='form-control form-control-lg' id='term'>
            <option>15</option>
            <option>30</option>
          </select>
        </div>
        <button className='btn btn-primary'>Calculate</button>
      </form>
      <div className='display' />
    </div>
  );
}
