import React from 'react';
import {Select} from 'antd';
import axios from 'axios';
import styles from './HouseSelector.less';

export default class HouseSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      houses: []
    };
  }

  fetchHouses() {
    axios.get('http://127.0.0.1:5000/api/houses', {
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
    this.props.getHouseName(selected);
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

    console.log('HouseSelector.state:', this.state);
    console.log('HouseSelector.props:', this.props);

    return (
      <div>
        <Select showSearch
                style={{ width: 200}}
                placeholder="Select House"
                optionFilterProp="children"
                onChange={this.handleChange.bind(this)}
        >
          {children}
        </Select>
      </div>
    );
  }
}
