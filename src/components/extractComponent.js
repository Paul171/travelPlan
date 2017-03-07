import React from 'react';
import Clock from './Clock';
const UserInfo = (props) => {
  return (<div className="UserInfo">
        <Avatar user={props.user}/>
        <div className="UserInfo-name">
          {props.user.name}
        </div>
      </div>);
}
//Composition part start
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
//End
const Avatar = (props) => {
  return (<img className="Avatar"
          src={props.user.avatarUrl}
          alt={props.user.name}
        />);
}
function Comment (props){
  const element = props.times.map((num) =>
        <Clock intervals={num} key={num.toString()} index={num.toString()}/>  
      );
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
      <div className="Comment-date">
        {props.date}
      </div>
      {element}
      
    </div>
  );
}

export default Comment;