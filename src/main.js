import React from 'react'

import ReactDOM from 'react-dom'
import uuid from 'uuid'
import _ from 'lodash';

const RandomList = React.createClass({
  getInitialState() {
    return {
      randStudent: ""
    }
  },
  getRandStudent(e) {
    console.log('click')
    let randIndex = Math.floor(Math.random() * this.props.students.length)
    let student = this.props.students[randIndex]
    this.setState({randStudent: student.name})
  },
  render() {


    return(

      <div className= "inner">
      <button onClick={this.getRandStudent}className="btn btn-primary">Get Random List</button>
      <h3>{this.state.randStudent}</h3>
      </div>
      )
  }
})

const TeamList = React.createClass({
  getInitialState() {
    return {
      numberOfTeams: 0,
      teams: []
    }
  },
  buildTeam(e) {
    let num = this.state.numberOfTeams;
    if (!(this.props.students.length % num)) {
      //Sort the array
      let shuffle =  _.shuffle(this.props.students);
      //Divide it by chuncks
      let tm = _.chunk(shuffle, num);
      // console.log('chunk', chunk)


      // teams = teams.map((team, index) => <ul className="list-groups" key={index + 1}>
      //   <h3>Team {index + 1} </h3>
      //   {
      //     team.map(s =><li className="list-group-item" key={s.id}>{s.name}</li>)
      //   }
      //   </ul>
      // );

      //Minifued
      tm=tm.map((t,i)=><ul className="list-groups"key={i+1}><h3>Team {i+1}</h3>{t.map(s=><li className="list-group-item"key={s.id}>{s.name}</li>)}</ul>);

      this.setState({teams: tm})
    } 
    else
      alert('Uneven teams')
  },
  render() {

    return (

      <div className="inner">
      <button onClick={this.buildTeam} className="btn btn-primary">Get Team</button>
      <input onChange={ e => this.setState({numberOfTeams: e.target.value}) } type="number" value={this.state.numberOfTeams} />
      {this.state.teams}
      </div>
      )
  }
})
const StudenstList = React.createClass({
  render() {
    return (
      <div className= "inner">
      <ul className=" list-groups">
      {this.props.students}
      </ul>
      </div>
      )
  }
})
const Root = React.createClass({
  getInitialState() {
    try {
      var students = JSON.parse(localStorage.students)
    } catch(e) {
      var students = []
    }
    return {
      students: students,
      studentName: ""
    }
  },
  addStudent(e) {
    if(this.state.studentName) {

      let newStudents = this.state.studentName.split(/[,\s]+/g)
      newStudents = newStudents.map(s => {
       return  {name: s, id: uuid.v4()}
      
      });

      this.setState({students: this.state.students.concat(newStudents), studentName: ''});
    }
  },
  remove(id) {
    console.log('students', this.state.students)
    let students = this.state.students.filter(student => {
      return student.id !== id
    })
    this.setState({students: this.students})
  },
  componentDidUpdate() {
    localStorage.students = JSON.stringify(this.state.students)
  },
  render() {
    let lis = this.state.students.map(  student =>  <li onDoubleClick={this.remove.bind(null, student.id)} className="list-group-item" key={student.id}>{student.name}</li>);

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
      <div  className="col-xs-4">
      <RandomList students={this.state.students} />
      </div>
      <div className="col-xs-4">
      <TeamList students={this.state.students}/>
      </div>
      <div className="col-xs-3">
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