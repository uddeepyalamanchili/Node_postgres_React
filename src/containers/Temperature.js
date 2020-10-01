import React from 'react';
import ReactDOM from 'react-dom';
import Menu from '../components/Menu'
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}

export default class Calculator extends React.Component {
  constructor(props) {
    console.log(">> constructor ..Calculator")
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    console.log(">>handleCelsiusChange "+ temperature);
    this.setState({scale: 'c', temperature: temperature});
  }

  handleFahrenheitChange(temperature) {
    console.log(">>handleFahrenheitChange" +temperature);
    this.setState({scale: 'f', temperature});
  }

  render() {
    const celsius = this.state.scale === 'f' ? tryConvert(this.state.temperature, toCelsius) : this.state.temperature;
    const fahrenheit = this.state.scale === 'c' ? tryConvert(this.state.temperature, toFahrenheit) : this.state.temperature;

    return (
      <div>
        <Menu/>
        <h3>Temperature Example</h3>
        <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
/*
ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);*/