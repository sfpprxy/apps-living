import React from 'react';
import {Select} from 'antd';
import axios from 'axios';

export default class HouseSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      houses: [],
      selected: 'Select House',
    };
  }

  fetchHouses() {
    axios.get('http://127.0.0.1:5002/api/houses', {
    })
      .then(jsonData => {
        this.setState({
          houses: jsonData.data.houses
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleChange(selected) {
    // console.log('HouseSelector Touched!!!');
    this.props.getHouseName(selected);
    this.setState({
      selected: selected
    });
  }

  reset() {
    if (this.props.disabled === true) {
      this.state.selected = 'Select House Disabled';
    }
  }

  componentDidMount() {
    this.fetchHouses();
  }

  render() {
    const Option = Select.Option;
    let h = this.state.houses;
    let children = [];
    for (let i = 0; i < h.length; i++) {
      children.push(<Option key={h[i].houseName}>
        {h[i].houseName}</Option>);
    }

    this.reset();

    console.log('HouseSelector.state:', this.state);
    console.log('HouseSelector.props:', this.props);

    return (
      <div>
        <Select showSearch
                style={{ width: 200}}
                placeholder="Select House"
                optionFilterProp="children"
                onChange={this.handleChange.bind(this)}
                value={this.state.selected}
                disabled={this.props.disabled}
        >
          {children}
        </Select>
      </div>
    );
  }
}
