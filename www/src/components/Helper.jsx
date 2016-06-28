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
    axios.get('http://127.0.0.1:5002/api/room/' + roomId, {
    })
      .then(jsonData => {
        alert(jsonData.data.room.email);
      })
      .catch(function (error) {
        console.log(error);
      });
    return true;
  }

  render() {
    return (
      true
    );
  }
}


