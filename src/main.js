import React from 'react'

import ReactDOM from 'react-dom'
import uuid from 'uuid'

const RandomList = React.createClass({
const StudenstList = React.createClass({
  render() {
    return (
      <ul className="list-groups">
        {this.props.students}
      </ul>
    )
  }
})
const Root = React.createClass({
  getInitialState() {
    return {
      students: [],
      studentName: ""
    }
  },
  addStudent(e) {
    if(this.state.studentName) {
      let newStudents = this.state.students.concat({
        name: this.state.studentName,
        id: uuid.v4()
      })

      this.setState({students: newStudents, studentName: ''});
    }
  },
  render() {
    let lis = this.state.students.map( student =>  <li key={student.id}>{student.name}</li>);

    return (
      <div className="container">

        <div className="row">
          <div className="col-xs-6">
            <h1>Student Picker</h1>
          </div>
          <div className="col-xs-6 add">
            <button onClick={this.addStudent} className="center btn btn-primary btn-md">+</button>
            <input onChange={ e => this.setState({studentName: e.target.value}) } type="text" value={this.state.studentName}/>
          </div>
        </div>
        
        <div className="row content">
          <div className="col-xs-4">
            <StudenstList students={lis}/>
          </div>
          <div className="col-xs-4">
            <StudenstList students={lis}/>
          </div>
          <div className="col-xs-4">
            <StudenstList students={lis}/>
          </div>
        </div>
      </div>
    )
  }
})

 ReactDOM.render(
  <Root />,
  document.getElementById('root')
)