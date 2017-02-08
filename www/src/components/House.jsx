import React from 'react';
import {Link} from 'react-router';
import {Button, message, Popconfirm, Table, Modal} from 'antd';
import axios from 'axios';
import styles from './House.less';
import HouseSelector from './HouseSelector'
import Helper from "./Helper";

export default class House extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      locale: {emptyText: 'No Data'},
      selectedRows: [],
      visible: false,
      emails: ''
    };
  }

  fetchTableData(params = {house: 'PENNY BLACK HOUSE'}) {
    axios.get(Helper.getURL() + '/api/tenants/' + params.house, {
    })
      .then(jsonData => {
        this.setState({
          loading: false,
          tableData: jsonData.data.tenants
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getHouseName(selected) {
    this.setState({
      house: selected
    });
    this.fetchTableData({house: selected});
  }

  delete(roomId) {
    axios.post(Helper.getURL() + '/api/delete-room', {
      roomId: roomId
    })
      .then(response => {
        console.log(response);
        this.fetchTableData({house: this.state.house});
      })
      .catch(function (error) {
        console.log(error);
      });
    message.success('Delete Success '
    );
  }

  showSelected() {
    this.baseShow(this.state.selectedRows);
  }

  showAll() {
    axios.get(Helper.getURL() + '/api/all-emails', {
    })
      .then(jsonData => {
        this.setState({
          emails: jsonData.data.emails
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    this.setState({
      visible: true
    });
  }

  baseShow(sourceEmails) {
    var e, myStringArray = sourceEmails;
    var emails = '';
    for (e of myStringArray) {
      emails += e.email;
      emails += ';\n';
    }
    console.log(emails)
    this.setState({
      emails: emails
    });

    this.setState({
      visible: true
    });
  }

  handleOk() {
    console.log('Clicked OK');
    this.setState({
      visible: false,
    });
  }

  handleCancel(e) {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  
  componentDidMount() {
    this.fetchTableData();
  }

  render() {

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
        this.setState({
          selectedRows: selectedRows
        });
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
        this.setState({
          selectedRows: selectedRows
        });
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
      }),
    };

    const columns = [{
      // title: 'Room ID',
      // dataIndex: 'roomId',
    }, {
      title: 'House Name',
      dataIndex: 'houseName'
    }, {
      title: 'Room Number',
      dataIndex: 'roomNumber'
    }, {
      title: 'Tenant Name',
      dataIndex: 'tenantName'
    }, {
      title: 'Email Address',
      dataIndex: 'email'
    }, {
      title: 'Operation',
      render: (text, record) => (
        <span>
          <Popconfirm title="Are you sure you want to delete this room?" okText="Confirm" cancelText="Cancel"
                      onConfirm={this.delete.bind(this, record.roomId)}>
            <a href="#">Delete</a>
          </Popconfirm>
        </span>
      )
    }];

    return (
      <div >
        <div className={styles.content}>
          <HouseSelector getHouseName={this.getHouseName.bind(this)}/>
          <Button className={styles.button} type="ghost"><Link to="/new-room">New Room</Link></Button>
          <Button className={styles.button} type="ghost"><Link to="/edit-room">Edit Room</Link></Button>
          <Button className={styles.button} type="ghost" onClick={this.showSelected.bind(this)}>Show Selected Emails</Button>
          <Button className={styles.showAll} type="ghost" onClick={this.showAll.bind(this)}>Show All Emails</Button>
        </div>

        <div>

          <Modal title="Emails to copy" visible={this.state.visible}
                 onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                 okText="OK" cancelText="Cancel">
            {this.state.emails}
          </Modal>
        </div>

        <br/>
        <Table rowSelection={rowSelection}
               columns={columns}
               rowKey={record => record.roomId}
               dataSource={this.state.tableData}
               pagination={false}
               loading={this.state.loading}
               locale={this.state.locale}
        />
        <br/><br/><br/>
      </div>
    );
  }
}

