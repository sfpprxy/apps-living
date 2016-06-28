import React from 'react';
import axios from 'axios';

export default class Helper extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     mama: '123123123'
  //   };
  // }

  static guaguaMethod() {
    alert('guagua');
  }

  static getRoom(roomId) {
    axios.get(Helper.getURL() + '/api/room/' + roomId, {
    })
      .then(jsonData => {
        alert(jsonData.data.room.email);
      })
      .catch(function (error) {
        console.log(error);
      });
    return true;
  }

  static getURL() {
    return 'http://139.59.172.12:5002'
  }

  render() {
    return (
      true
    );
  }
}


