import React from 'react';
import {Table, Select} from 'antd';
import axios from 'axios';


export default class StudentTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {},
      loading: false,
      locale: {emptyText: 'No Data'},
      houseName: '26%20WARWICK%20ROW',
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

  fetch(params = {houseName: 'DAVENTRY ROAD'}) {
    console.log('请求参数：', params);
    axios.get('http://127.0.0.1:5000/api/student/' + params.houseName, {
      // student: 10,
      // ...params,
    })
      .then(jsonData => {
        console.log('AAAAA', this.state);
        const pagination = this.state.pagination;
        // Read total count from server
        // pagination.total = data.totalCount;
        // TODO: change hard code
        pagination.total = jsonData.data.length;
        console.log(jsonData);
        this.setState({
          loading: false,
          tableData: jsonData.data.student,
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
      // TODO: change hard code below
      // filters: [
      //   { text: '26 WARWICK ROW', value: '26 WARWICK ROW' },
      //   { text: '27 WARWICK ROW', value: '27 WARWICK ROW' },
      //   { text: 'CASSELDEN HOUSE', value: 'CASSELDEN HOUSE' },
      //   { text: 'FORTRESS HOUSE', value: 'FORTRESS HOUSE' },
      //   { text: 'GULSON COURT', value: 'GULSON COURT' },
      //   { text: 'PENNY BLACK HOUSE', value: 'PENNY BLACK HOUSE' },
      //   { text: 'WATERS COURT', value: 'WATERS COURT' },
      // ],
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

    console.log('THIS.STATE:', this.state);

    return (
      <div>
        <Select showSearch
                style={{ width: 200 }}
                placeholder="Select apartment"
                optionFilterProp="children"
                notFoundContent="无法找到"
                onChange={this.handleChange.bind(this)}
        >
          <Option value="CASSELDEN HOUSE">CASSELDEN HOUSE</Option>
          <Option value="lucy">露西</Option>
          <Option value="tom">汤姆</Option>
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

