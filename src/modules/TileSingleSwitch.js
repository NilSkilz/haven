import React, { Component } from 'react';
import TileFunctions from '../common/tile.js';
import { connect } from 'react-redux';
import Checkbox from '../components/forms/Checkbox';
import Axios from 'axios';

class TileMultiSwitch extends Component {
  state = { value: 'on' };

  //	Delegates
  //--------------------------------------------------------//
  componentDidMount = async () => {
    const tile = new TileFunctions(this.props.config);
    const entities = await tile.fetchData(this.props.tile.entities);
    entities.map(entity => this.props.dispatch({ type: 'SET_ENTITY', entity }));
  };

  componentWillUpdate = newProps => {
    const entity_id = this.props.tile.entities[0];

    const oldState = this.props.entities && this.props.entities[entity_id] && this.props.entities[entity_id].state;
    const newState = newProps.entities[entity_id] && newProps.entities[entity_id].state;

    if (oldState !== newState) {
      if (oldState) {
        this.setState({ old: parseFloat(oldState) });
      }
    }
  };

  onChange = event => {
    const entity = this.props.tile.entities[0];
    const e = this.props.entities[entity];
    Axios.post(`${this.props.config.homeAssistantAddress}/api/states/${e.entity_id}`, {
      state: e.state === 'on' ? 'off' : 'on'
    });
  };

  //	Render
  //--------------------------------------------------------//
  render() {
    const { tile } = this.props;
    return tile.entities.length > 0 ? (
      <div className='simple-control w-100 h-100 p-3 pt-5 d-flex'>
        {tile.title.visible ? (
          <div className='w-100'>
            <h3>{this.props.tile.title.value}</h3>
            {tile.entities.map(entity => {
              const e = this.props.entities[entity];
              if (!e) return null;
              return (
                <div className='simple-control--row'>
                  <Checkbox
                    {...{
                      id: e.entity_id,
                      label: '',
                      checked: e.state === 'on' ? true : false,
                      onChange: this.onChange
                    }}
                  />
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    ) : (
      <div className='tile--error'>
        <p>
          Configuration Error
          <br />
          Check your entity_id
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    config: state.config,
    entities: state.entities,
    pages: state.pages
  };
};

const componentConnector = connect(mapStateToProps);

export default componentConnector(TileMultiSwitch);
