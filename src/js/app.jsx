import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';

export default function App() {
  const name = 'Joey';
  return (
    <div className='container'>
      <h1 className='title-test'>{name}</h1>
      <button className='btn btn-primary'>TEST</button>
    </div>
  );
}
