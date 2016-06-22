import React from 'react';
import {Table, Select} from 'antd';
import axios from 'axios';


export default class StudentTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: [],
      pagination: {},
      loading: false,
      locale: {emptyText: 'No Data'},
      // TODO: get apartments by api
      apartments: []
    };
  }

  // handleTableChange(pagination, filters, sorter) {
  //   console.log('各类参数是', pagination, filters, sorter);
  //   console.log('aaaa');
  //   const pager = this.state.pagination;
  //   console.log('bbbb');
  //   pager.current = pagination.current;
  //   this.setState({
  //     pagination: pager,
  //   });
  //   this.fetch({
  //     student: pagination.pageSize,
  //     page: pagination.current,
  //     sortField: sorter.field,
  //     sortOrder: sorter.order,
  //     ...filters,
  //   });
  // }
  fetchApartments() {
    axios.get('http://127.0.0.1:5000/api/apartments', {
    })
      .then(jsonData => {
        console.log('APART', jsonData);
        this.setState({
          apartments: jsonData.data.apartments
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  fetch(params = {houseName: 'PENNY BLACK HOUSE'}) {
    console.log('请求参数：', params);
    axios.get('http://127.0.0.1:5000/api/students/' + params.houseName, {
    })
      .then(jsonData => {
        const pagination = this.state.pagination;
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = jsonData.data.students.length;
        console.log(jsonData);
        this.setState({
          loading: false,
          tableData: jsonData.data.students,
          pagination,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleChange(value) {
    console.log(`selected ${value}`);
    console.log('selected', {value});
    this.fetch({houseName: value});
  }

  componentDidMount() {
    this.fetch();
    this.fetchApartments();
  }

  render() {

    const columns = [{
      title: 'Studnet ID',
      dataIndex: 'studentId',
    }, {
      title: 'Studnet Name',
      dataIndex: 'studentName',
    }, {
      title: 'House Name',
      dataIndex: 'houseName',
    }, {
      title: 'Room Number',
      dataIndex: 'roomNumber',
    }, {
      title: 'Email Address',
      dataIndex: 'email',
    }, {
      title: 'Operation',
      render: (text, record) => (
        <span>
          <a href="#">Edit</a>
        </span>
      ),
    }];

    const Option = Select.Option;
    let apt = this.state.apartments;
    let children = [];
    for (let i = 0; i < apt.length; i++) {
      children.push(<Option key={apt[i].houseName}>
        {apt[i].houseName}</Option>);
    }

    console.log('THIS.STATE:', this.state);

    return (
      <div>
        <Select showSearch
                style={{ width: 200 }}
                placeholder="Select apartment"
                optionFilterProp="children"
                onChange={this.handleChange.bind(this)}
        >
          {children}
        </Select>
        <p>
          {this.value}
        </p>
        <Table columns={columns}
               rowKey={record => record.studentId}
               dataSource={this.state.tableData}
               pagination={this.state.pagination}
               loading={this.state.loading}
               locale={this.state.locale}
        />
      </div>

    );
  }
}

