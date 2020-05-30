import React, {Component} from 'react';
import './TextInput.css';
import Fade from 'react-reveal/Fade';
import {Field} from 'redux-form';



const errOut = (err) => {
  return (
    <Fade bottom>
      <div className="TextInput__errorOutput">{err}</div>
    </Fade>
  )
}

const renderField = ({
    input,
    label,
    type,
    meta: {touched, error, warning}
  }
) => {
  let classes = "";
  if (error && touched)
    classes += " TextInput__input_error";
  else
    classes += " TextInput__input_ok";
  return (<>
      <input className={"TextInput__input" + classes} {...input} placeholder={label} type={type} />
      {error && touched && errOut(error) }
    </>)
}

class TextInput extends Component {
  constructor(props)
  {
    super(props);

    this.state = {
      isFocused: false,
      isFill: false,
    }
  }

  handleChange(e)
  {
    if (e.target.value !== '')
    {
      this.setState({isFill: true});
    }
    else {
      this.setState({isFill: false});
    }
  }

  handleFocus()
  {
    this.setState({isFocused: true});
  }

  handleBlur()
  {
    this.setState({isFocused: false});
  }

  isActive()
  {
    return (this.state.isFocused || this.state.isFill);
  }

  render()
  {
    return(
      <div className={(this.props.className || "") + " TextInput" + (this.isActive() ? " TextInput_active" : "")}>
        <label className="TextInput__label">{this.props.label}</label>
        <Field type={this.props.type}
               component={renderField}
               name={this.props.name}
               onChange={(e) => this.handleChange(e)}
               onFocus={() => this.handleFocus()}
               onBlur={() => this.handleBlur()}
               className="TextInput__input"/>
      </div>
    )
  }

}

export default TextInput;
