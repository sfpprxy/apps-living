import React from 'react';
import { Table, Icon } from 'antd';

export default class StudentTable extends React.Component {
  render() {
    const columns = [{
      title: 'Studnet ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: 'Studnet Name',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'House Name',
      dataIndex: 'houseName',
      key: 'houseName',
    }, {
      title: 'Room Number',
      dataIndex: 'roomNumber',
      key: 'roomNumber',
    }, {
        title: 'Email Address',
        dataIndex: 'email',
        key: 'email',
    }, {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span>
          <a href="#">Edit {record.name}</a>
        </span>
      ),
    }];

    const data = [{
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    }, {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    }, {
      key: '4',
      name: '李大嘴',
      age: 32,
      address: '西湖区湖底公园1号',
    }];
    return (
      <Table columns={columns} dataSource={data} />
    );
  }
}
