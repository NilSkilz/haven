import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';

class Checkbox extends Component {
  onChange = value => {
    this.props.onChange({
      target: {
        id: this.props.id,
        value: value.target.value
      }
    });
  };
  render() {
    const { id, label, checked, onChange } = this.props;
    return (
      <Form.Group controlId={id}>
        <p>{label}</p>
        <label className='switch'>
          <input className='apple-switch' type='checkbox' checked={checked} onChange={onChange} id={id} />
          <div className='slider' />
        </label>
      </Form.Group>
    );
  }
}

export default Checkbox;
