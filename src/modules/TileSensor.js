import React, { Component } from 'react';
import TileFunctions from '../common/tile.js';
import { connect } from 'react-redux';
import CountUp from 'react-countup';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import Icon from '../assets/icons/Icon';
import _ from 'lodash';

class TileSensor extends Component {
  state = { old: 1, style: {} };

  //	Delegates
  //--------------------------------------------------------//
  componentDidMount = async () => {
    const tile = new TileFunctions(this.props.config);
    tile.fetchData(this.props.tile.entities).then(entities => {
      console.log('ENTITIES', entities);
      entities.map(entity => this.props.dispatch({ type: 'SET_ENTITY', entity }));
    });

    if (this.props.tile.graph.visible) {
      this.getGraphData();
    }
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

  getGraphData = () => {
    const entity = this.props.entities[this.props.tile.entities[0]];
    fetch(
      `${this.props.config.influxAddress}/query?pretty=false&db=${
        this.props.config.influxDB
      }&q=SELECT+mean%28%22value%22%29+FROM+%22${
        entity.attributes.unit_of_measurement
      }%22+WHERE+%28%22entity_id%22+%3D+%27${
        entity.entity_id.split('.')[1]
      }%27%29+AND+time+%3E+now%28%29+-+1d+GROUP+BY+time%2830m%29+fill%28none%29`,
      {
        headers: new Headers({
          Authorization: 'Basic ' + btoa('api:password')
        })
      }
    )
      .then(response => response.json())
      .then(json => {
        const data = json.results[0].series && json.results[0].series[0];
        this.formatGraphData(data);
      });
  };

  formatGraphData = data => {
    let arr = [];

    data &&
      data.values.map(value => {
        let obj = {};

        data.columns.map(title => {
          return (obj[title] = value[data.columns.indexOf(title)]);
        });

        return arr.push(obj);
      });

    this.setState({ data: arr });
  };

  //	Render
  //--------------------------------------------------------//
  render() {
    let entity = null;
    const { tile } = this.props;
    if (tile.entities.length > 1) {
      entity = {};

      if (!tile.calculation) tile.calculation = 'Average';

      let total = 0;

      tile.entities.forEach(entity_id => {
        if (this.props.entities && this.props.entities[entity_id]) {
          total += parseFloat(this.props.entities[entity_id].state);
        }
      });
      if (tile.calculation === 'Average') {
        entity.state = total / parseFloat(tile.entities.length);
      } else {
        entity.state = total;
      }
    } else {
      entity = this.props.entities[tile.entities[0]];
      if (entity && entity.message === 'Entity not found.') {
        entity = undefined;
      }
    }

    let iconSize = 75;
    if (this.props.tile.h === 1) {
      iconSize = 50;
    }
    const icon = this.props.tile.icon.value;
    return entity ? (
      <div>
        {tile.icon.visible ? (
          <div>
            <Icon
              style={this.state.style}
              width={iconSize}
              className='tile--icon-large'
              stroke='#fff'
              strokeWidth={this.props.tile.w === 1 ? '2' : '1'}
              fill='#202020'
              type={icon}
            />
          </div>
        ) : null}
        <div>
          <CountUp decimals={0} decimal='.' className='h2' end={parseFloat(entity.state)} start={this.state.old} />

          <sup>
            {this.props.tile.unitOfMeasurement || this.props.entities[tile.entities[0]].attributes.unit_of_measurement}
          </sup>
        </div>
        {tile.title.visible ? (
          <div>
            <h3>{this.props.tile.title.value}</h3>
          </div>
        ) : null}
        {tile.graph.visible ? (
          <div>
            <ResponsiveContainer className='fixed-bottom pl-3' width={150 * this.props.tile.w} height='30%'>
              <AreaChart data={this.state.data}>
                <Area
                  className='line'
                  type='monotone'
                  dataKey='mean'
                  // stroke={'url(#gradient'}
                  // fill={this.props.tile.graph.area ? 'url(#gradientFill' : '#202020'}
                  stroke={'url(#' + _.get(this, 'props.tile.graph.id', 'gradient') + ')'}
                  fill={
                    this.props.tile.graph.area
                      ? 'url(#' + _.get(this, 'props.tile.graph.id', 'gradientFill') + 'Fill)'
                      : '#202020'
                  }
                  strokeWidth={2}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : null}
        <div>
          <svg style={{ width: 0, height: 0, position: 'absolute' }} aria-hidden='true' focusable='false'>
            <linearGradient id={this.props.tile.graph.id}>
              <stop stopColor={_.get(this, 'props.tile.graph.colors.primary', '#09E5C3')} offset='0' />
              <stop stopColor={_.get(this, 'props.tile.graph.colors.secondary', '#EEF85B')} offset='1' />
            </linearGradient>
            <linearGradient id={this.props.tile.graph.id + 'Fill'} gradientTransform='rotate(90)'>
              <stop stopColor={_.get(this, 'props.tile.graph.colors.primary', '#EEF85B')} offset='0' />
              <stop stopColor={'#202020'} offset='0.9' />
            </linearGradient>
          </svg>
        </div>
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

export default componentConnector(TileSensor);
