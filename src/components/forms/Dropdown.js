import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';

import 'react-widgets/dist/css/react-widgets.css';

class Dropdown extends Component {
  render() {
    const { id, label, data, value, onChange, text } = this.props;
    return (
      <Form.Group controlId={id}>
        <Form.Label>{label}</Form.Label>
        {text ? (
          <div>
            <Form.Text>{text}</Form.Text>
            <br />
          </div>
        ) : null}
        <Form.Control as="select" onChange={onChange} value={value}>
          <option>Please Select</option>
          {data.map(d => {
            return <option key={d}>{d}</option>;
          })}
        </Form.Control>
      </Form.Group>
    );
  }
}

export default Dropdown;
