import React from 'react';
import { Map, List } from 'immutable';
import moment from 'moment';

export const DateRangePicker = React.createClass({
  getInitialState() {
    return {
      data: Map({
        buttons: List([Map({
          id: 1,
          title: 'Last 10 Days',
          selected: true,
          range() {
            return {
              startDate: moment().subtract(10, 'days').hours(0).minutes(0).seconds(0).milliseconds(0).format(),
              endDate: moment().format()
            };
          }
        }), Map({
          id: 2,
          title: 'Last 30 Days',
          selected: false,
          range() {
            return {
              startDate: moment().subtract(30, 'days').hours(0).minutes(0).seconds(0).milliseconds(0).format(),
              endDate: moment().format()
            };
          }
        }), Map({
          id: 3,
          title: 'All times',
          selected: false,
          range() {
            return {
              startDate: null,
              endDate: null
            };
          }
        })])
      })
    };
  },

  onClick(i) {
    let range = this.state.data.get('buttons').get(i).get('range')();
    this.props.onChange(range);
    this.setState(({data}) => ({
      data: data.update('buttons', buttons => buttons.map((b, index) => {
        if (index === i) {
          return b.update('selected', () => true );
        } else {
          return b.update('selected', () => false );
        }
      }))
    }));
  },

  render() {
    return <div className="button-group">
      {
        this.state.data.get('buttons').map((button, key) => {
          const onClick = this.onClick.bind(this, key);
          return <button className={`button ${button.get('selected')?"selected":""}`} key={key} onClick={onClick}>
            {button.get('title')}
          </button>
        })
      }
    </div>;
  }
});