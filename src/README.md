#Learning ReactJS
* JSX expression used in {} 
* All React components must act like pure functions with respect to their props. do not make any change on their inputs and alway return the same result for the same inputs
* Components defined as classes have some additional features, such as local state which is only available to class
* Always start component names with a capital letter.
```javascript
 const Avatar = (props) => {
  return (<img className="Avatar"
          src={props.user.avatarUrl}
          alt={props.user.name}
        />);
}
<Avatar user={user}/>
```

## Create React component class
* can use local state and lifecycle hooks after creation of the react component class
* Steps for converting a Function to a Class
 1. Create an ES6 class with the same name that extends `React.Component`
 2. Add a single empty method to it called `render()`
 3. Move the body of the function into the `render()` method
 4. Replace `props` with `this.props` in the `render()` body
 5. Delete the remaining empty function declaration.
```javascript
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
### Adding local state to a Class
* move the date from props to state in three steps
1. Replace `this.props.date` with `this.state.date` in the render() method:
2. Add a class constructor that assigns the initial `this.state`,Class components should always call the base constructor with props.
3. Remove the `date` prop from the `<Clock />` element:

### Adding Lifecycle Methods to a Class
"mounting" in React: the first time it's rendered for the DOM of compoent
"unmounting" in React: DOM of the component is removed

"lifecycle hooks" methods
* `componentDidMount()`: runs after the component output has been rendered to the DOM,When the component output is inserted in the DOM, React calls the componentDidMount() lifecycle hook
* `componentWillUnmount()`: run when the component removed from the DOM

## Using state correctly
### Do Not Modify State Directly
* use `setState()` and **dont't** modify the state directly
* only can assign the state in the consturctor
### State Updates May Be Asynchronous
* use a second form of `setState()`: receive the previous state as the first argument, and the props at the time the update is applied as the second argument
```javascript
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```
### State Updates are Merged
* call `setState()`, React merges the object you provide into the current state
* can update them independently with separate setState() calls:

## The Data Flows Down
* component doesn't know if a certain component is stateful or stateless, and they shouldn't care whether it is defined as a function or a class
* state s not accessible to any component other than the one that owns and sets it
* pass its state down as props to its child components
* any data or UI derived from that state can only affect components "below" them in the tree
* You can use stateless components inside stateful components, and vice versa.

##Handling Events
* React events are named using camelCase, such as onClick
* With JSX you pass a function as the event handler, rather than a string `onClick={activateLasers}`
* **cannot return false** to prevent default behavior in React, must call `preventDefault` explicitly
* use an arrow function in the callback,a different callback is created each time the LoggingButton renders. If this callback is passed as a prop to lower components, those components might do an extra re-rendering
* recommend binding in the constructor or using the property initializer syntax, to avoid this sort of performance problem.
 * property initializer syntax 
 ```javascript
 class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
 ``` 
 * binding in the constructor
 ```javascript
 class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }
 ```
## Conditional Rendering
* stateful componenet to check the state to help you conditionally render a part of the component while the rest of the output doesn't change
```javascript
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    let button = null;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}
```
### inline conditions in JSX shorter syntax
* Inline If with Logical && Operator
 * embed any expression in JSX
```javascript
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```
 * if the condition is true, the element right after && will appear in the output
 * if false, React will ignore and skip it.
 * `true && expression`:evaluate expression, `false && expression`: `false`

* Inline If-Else with Conditional Operator
 * `condition ? true : false.`
 ```javascript
 render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
    </div>
  );
}
 ```
#### whenever conditions become too complex, it might be a good time to extract a component
### Preventing Component from Rendering
* return `null` to hide itself even though it was rendered by another component
* even return `null` does not affect the firing of the component's lifecycle methods, the component's lifecycle will keep on running, such as `componentWillUpdate` and `componentDidUpdate` will still be called

## Lists and Keys
### Rendering Multiple Components
* using `map` function of array to render multiple components
```javascript
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>{number}</li>
);
```
* key should be provided for list items which is a special string attribute you need to include when creating lists of elements
* key
 * identify which items have changed, are added, or are removed
 * give the elements in array to have a stable identity
 * best way: use a string or item index as a key that uniquely identifies a list item
 * if the items can reorder, using item item would be slow
### Extracting Components with Keys
* should keep the key on the <ListItem /> elements in the array if you extract item as a component
* elements inside the `map()` call need keys
```javascript
function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```
### Keys Must Only Be Unique Among Siblings
* can use the same keys when we produce two different arrays
* Keys don't get passed to your components
### Embedding map() in JSX
* JSX allows embedding any expressions in curly braces so we could inline the `map()` result
```javascript
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}
```
#### if the `map()` body is too nested, it might be a good time to extract a component.

## Forms
### Controlled Components
* Each HTML form elements such as textbox, inputbox and selectbox in React as a "controlled components"
* An input form element as a controlled component, controlled by React
* use handleChange to update the state value as the user typed
* displayed value will always be `this.state.value`
* the controlled component of textarea is similar to textbox with value and onChange attribute to update and display the value
```javascript
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```
### select tag
* React will use a `value` attribute on `select` tag, instead of using `selected` attribute to update the value
* `<input type="text"/>`, `<select>` and `<textarea></textarea>` are similar by adding `value` attribute
```javascript
<select value={this.state.value} onChange={this.handleChange}>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>
```
### Handling Multiple Inputs
* handle multiple `input` elements, add a `name` attribute to each element and let the handler function choose what to do based on the value of `event.target.name`
```javascript
<label>
  Is going:
  <input
    name="isGoing"
    type="checkbox"
    checked={this.state.isGoing}
    onChange={this.handleInputChange} />
</label>
<br />
<label>
  Number of guests:
  <input
    name="numberOfGuests"
    type="number"
    value={this.state.numberOfGuests}
    onChange={this.handleInputChange} />
</label>
```
* used the ES6 computed property name syntax to update the state key corresponding to the given input name
```javascript
this.setState({
  [name]: value
});
```
* equivalent ES5 way to update
```javascript
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```
### Alternatives to Controlled Components
#### Uncontrolled component
* form data is handled by the DOM while controlled component is handled by a React component
* easier to integrate React and non-React code
```javascript
handleSubmit(event) {
  alert('A name was submitted: ' + this.input.value);
  event.preventDefault();
}
<input type="text" ref={(input) => this.input = input} />
```
#### Default Values
* only can use for uncontrolled component
* the `value` attribute on form elements will override the `value` in the DOM
* specify the initial value by adding `defaultValue` attribute
* `<input type="checkbox">` and `<input type="radio">` support defaultChecked
* `<select>` supports `defaultValue`
```javascript
<input
          defaultValue="Bob"
          type="text"
          ref={(input) => this.input = input} />
```
## Lifting States Up
* lifting the shared state up to their closest common ancestor
* single "source of truth" for any data that changes in a React application
* something can be derived from either props or state, it probably shouldn't be in the state
* create a parent component and use props to pass the value to the child component
* props are read-only, therefore, using the onChange function in parent component to change the value
```javascript
//child 
handleChange(e) {
    // Before: this.setState({value: e.target.value});
    this.props.onChange(e.target.value);
  }
//parent
handleFahrenheitChange(value) {
    this.setState({scale: 'f', value});
  }
<TemperatureInput
          scale="f"
          value={fahrenheit}
          onChange={this.handleFahrenheitChange} />
```
The completed source code of parent component
```javascript
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {value: '', scale: 'c'};
  }

  handleCelsiusChange(value) {
    this.setState({scale: 'c', value});
  }

  handleFahrenheitChange(value) {
    this.setState({scale: 'f', value});
  }

  render() {
    const scale = this.state.scale;
    const value = this.state.value;
    const celsius = scale === 'f' ? tryConvert(value, toCelsius) : value;
    const fahrenheit = scale === 'c' ? tryConvert(value, toFahrenheit) : value;

    return (
      <div>
        <TemperatureInput
          scale="c"
          value={celsius}
          onChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          value={fahrenheit}
          onChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

```
## Composition Vs Inheritance
* using composition instead of inheritance to reuse code between components
### Containment
* components use the special `children` prop to pass children elements directly into their output
```javascript
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
//other components pass arbitrary children to them by nesting the JSX
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```
* Anything inside the `<FancyBorder>` JSX tag gets passed into the `FancyBorder` component as a `children` prop
* multiple "holes" in a component
```javascript
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```
* can pass object as a props
### Specialization
* components as being "special cases" of other components
* more "specific" component renders a more "generic" one and configures it with props
```javascript
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
  );
}
```
### So What About Inheritance?
* Props and composition give you all the flexibility you need to customize a component's look and behavior in an explicit and safe way
* props can be are primitive values, React elements, or functions
* reuse non-UI functionality between components
 * extracting it into a separate JavaScript module
 * import it and use that function, object, or a class, without extending it
## Thinking in React
### Step1: Break The UI Into A Component Hierarchy
* One technique is single responsibility principle
 * a component should ideally only do one thing
 * If it ends up growing, it should be decomposed into smaller subcomponents.
* break it up into components that represent exactly one piece of your data model
* Components that appear within another component in the mock should appear as a child in the hierarchy

### Step 2: Build A Static Version in React
* build components that reuse other components and pass data using props
* props are a way of passing data from parent to child
* State is reserved only for interactivity, data that changes over time
* build project
 * start building with top-down for simpler project
 * bottom-up and write tests as you build for larget project
* top hierachy will take your data model as a prop
 * make a change to your underlying data model
 * call `ReactDOM.render()` again
 * UI will be updated
* one-way data/one-way databinding
 * keeps everything modular
 * fast
#### A Brief Interlude: Props vs State
*  two types of "model" data in React, need to understand the distinction between the two
 * props
 * state  
### Step 3: Identify The Minimal (but complete) Representation Of UI State
* make your UI interactive, use `state` to trigger changes to your underlying data model
* minimal set of mutable state that your app needs
 * Don't Repeat Yourself(DRY)
 * Figure out the absolute minimal representation of the state your application needs
 * compute everything else you need on-demand
* figure out which one is state by three questions
 * Is it passed in from a parent via props? If so, it probably isn't state (inheritance)
 * Does it remain unchanged over time? If so, it probably isn't state. (Constant)
 * Can you compute it based on any other state or props in your component? If so, it isn't state (computation)
### Step 4: Identify Where Your State Should Live
* For each piece of state in your application
 * Identify every component that renders something based on that state
 * Find a common owner component (a single component above all the components that need the state in the hierarchy)
 * Either the common owner or another component higher up in the hierarchy should own the state
 * If you can't find a component where it makes sense to own the state, create a new component simply for holding the state and add it somewhere in the hierarchy above the common owner component
* pass callbacks to child component that will fire whenever the state should be updated
* 

#Learning React Native
* reusable component
```javascript
//MyScene.js
import React, { Component } from 'react';
import { View, Text, Navigator } from 'react-native';

export default class MyScene extends Component {
  static get defaultProps() {
    return {
      title: 'MyScene'
    };
  }

  render() {
    return (
      <View>
        <Text>Hi! My name is {this.props.title}.</Text>
      </View>
    )
  }
}
//js file uses MyScene.js
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import MyScene from './MyScene';

class YoDawgApp extends Component {
  render() {
    return (
      <MyScene />
    )
  }
}

AppRegistry.registerComponent('YoDawgApp', () => YoDawgApp);
```
* Navigator case
```javascript
//index*.js
import React, { Component } from 'react';
import { AppRegistry, Navigator } from 'react-native';

import MyScene from './MyScene';

class SimpleNavigationApp extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ title: 'My Initial Scene', index: 0 }}
        renderScene={(route, navigator) =>
          <MyScene
            title={route.title}

            // Function to call when a new scene should be displayed
            onForward={() => {    
              const nextIndex = route.index + 1;
              navigator.push({
                title: 'Scene ' + nextIndex,
                index: nextIndex,
              });
            }}

            // Function to call to go back to the previous scene
            onBack={() => {
              if (route.index > 0) {
                navigator.pop();
              }
            }}
          />
        }
      />
    )
  }
}

AppRegistry.registerComponent('SimpleNavigationApp', () => SimpleNavigationApp);
//MyScene.js
import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

export default class MyScene extends Component {
  render() {
    return (
      <View>
        <Text>Current Scene: {this.props.title}</Text>

        <TouchableHighlight onPress={this.props.onForward}>
          <Text>Tap me to load the next scene</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.props.onBack}>
          <Text>Tap me to go back</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

MyScene.propTypes = {
  title: PropTypes.string.isRequired,
  onForward: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};
```


