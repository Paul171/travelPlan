import React from 'react';
import ReactDOM from 'react-dom';
import Comment from './components/extractComponent';
import Clock from './components/Clock';
import NameForm from './components/NameForm';
function FormatName(names) {
  return <h1>{names.firstName} {names.lastName}</h1>;
  }

const user = {
  firstName: 'LO',
    lastName: 'Paul'
    };
//All React components must act like pure functions with respect to their props. 
//It means do not change their input and always return the same result for the same inputs    
//JSX: {user.firstname} use {} for expression
//Always start component names with a capital letter.
// const element = (
//   <div>
//     <FormatName firstName={user.firstName} lastName={user.lastName} />
//     <FormatName firstName={user.firstName} lastName={user.lastName} />
//   </div>); 
// must start react with top level component except you integrate react with existing app which might start with botton-up component
function App(){
  return (
    <div>
      <FormatName firstName="{user.firstName}" lastName="{user.lastName}" />
      <FormatName firstName={user.firstName} lastName={user.lastName} />      
    </div>); 
}
const timeIntervals = [1000,5000];
const authorInfo = {
  author: {
    avatarUrl:"Paul",
    name:"Paul"
  },
  date: "2017-02-18",
  text: "sdfsdf"  
};

ReactDOM.render(
  <div><Comment author={authorInfo.author} text={authorInfo.text} date={authorInfo.date} times={timeIntervals} /><NameForm /></div>,
    document.getElementById('root')
    );