import React, { Component } from 'react';
import TileFunctions from '../common/tile.js';
import Icon from '../assets/icons/Icon';
import { connect } from 'react-redux';

class TileIcon extends Component {
  state = {
    entities: null,
    icon: '',
    label: '',
    deviceState: '',
    clicked: false,
    style: {}
  };

  //	Classes
  //--------------------------------------------------------//
  // tileClasses = classNames(tile.classes(this.props.tile));

  //	Delegates
  //--------------------------------------------------------//
  componentDidMount = async () => {
    const tile = new TileFunctions(this.props.config);
    tile.fetchData(this.props.tile.entities).then(entities => {
      entities.map(entity => this.props.dispatch({ type: 'SET_ENTITY', entity }));
    });
  };

  componentWillMount = () => {
    this.update();
  };

  getDescription = () => {
    const { icon } = this.props.tile;

    let description = '';

    let count = 0;

    this.props.tile.entities.map(entity => {
      if (this.props.entities[entity]) {
        if (this.props.entities[entity].state === 'on') count++;
        if (this.props.entities[entity].state === 'home') count++;
        if (this.props.entities[entity].state === 'playing') count++;
        if (this.props.entities[entity].state === 'locked') count++;
      }
      return null;
    });

    switch (icon.value) {
      case 'bulb':
        description = count.toString() + ' rooms on';
        if (count.toString() === '1') {
          description = '1 room on';
        }
        break;
      case 'power':
        description = count.toString() + ' devices on';
        if (count.toString() === '1') {
          description = '1 device on';
        }
        break;
      case 'user':
        description = count.toString() + ' people present';
        if (count.toString() === '1') {
          description = '1 person present';
        }
        break;
      case 'lock':
        description = count === 0 ? 'Unlocked' : 'Locked';
        break;
      case 'TV':
        description = count === 0 ? 'Off' : 'On';
        break;
      case 'motion':
        description = count === 0 ? 'No Motion' : 'Motion Detected';
        break;
      default:
        description = 'Error';
        break;
    }
    return description;
  };

  //	Update State
  //--------------------------------------------------------//
  update = () => {
    const icon = this.props.tile.icon.value;

    if (icon) {
      if (icon === 'bulb') {
        this.setState({ style: { transform: 'rotate(135deg)' } });
      }
    }
  };

  //	Render
  //--------------------------------------------------------//
  render() {
    const { icon, title } = this.props.tile;
    const description = this.getDescription();

    let entity = null;
    const entity_id = this.props.tile.entities[0];

    if (this.props.entities && this.props.entities[entity_id]) {
      entity = this.props.entities[entity_id];
    }

    // const entity = this.state.entities ? this.state.entities[0] : null;
    let iconSize = 75;

    if (this.props.tile.w === 1) {
      iconSize = 50;
    }

    return entity ? (
      // <Link to={this.props.tile.link}>
      // <div className={this.tileClasses}>
      <div>
        {icon.visible ? (
          <Icon
            style={this.state.style}
            width={iconSize}
            className='tile--icon-large'
            stroke='#fff'
            strokeWidth={this.props.tile.w === 1 ? '2' : '1'}
            fill='#202020'
            type={icon.value}
          />
        ) : null}

        <h3 className='m-0 mt-2'>{title.value}</h3>
        <h4 className='m-0'>{description}</h4>
      </div>
    ) : // </div>
    // </Link>
    null;
  }
}

const mapStateToProps = state => {
  return {
    config: state.config,
    entities: state.entities,
    pages: state.pages,
    timestamp: state.timestamp
  };
};

const componentConnector = connect(mapStateToProps);

export default componentConnector(TileIcon);
