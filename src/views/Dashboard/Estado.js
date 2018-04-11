import React, { Component } from 'react';

class Estado extends Component {
  render(){
  return (
    <div>
      <div className="animated fadeIn">
        Dolar de hoy es: {this.props.dolar.serie[0].valor}
      </div>
      <div className="animated fadeIn">
        Dolar de ayer fue: {this.props.dolar.serie[1].valor}
      </div>
    </div>
    )}
  }
export default Estado;
