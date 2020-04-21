import React from "react";

export default class Form extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      creditorName: "",
      firstName: "",
      lastName: "Tester79",
      minPaymentPercentage: 0,
      balance: 0
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  handleChange(e) {
    // update state on input
    let { name, value } = e.target;
    let state = this.state;
    Number(value) ? value = Number(value) : null;

    state[name] = value;

    this.setState({
      state
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    // add debt
    this.props.addOneDebt(this.state);

    this.resetForm();
  }

  resetForm() {
    this.setState({
      creditorName: "",
      firstName: "",
      lastName: "Tester79",
      minPaymentPercentage: 0,
      balance: 0
    })
  }

  render() {
    const {creditorName, firstName, lastName, minPaymentPercentage, balance} = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Creditor
          <input
            type="text"
            name={"creditorName"}
            value={creditorName}
            onChange={this.handleChange}
          />
        </label>
        <label>
          First Name
          <input
            type="text"
            name={"firstName"}
            value={firstName}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            name={"lastName"}
            value={lastName}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Min Payment Percentage
          <input
            type="number"
            name={"minPaymentPercentage"}
            value={minPaymentPercentage}
            onChange={this.handleChange}
            placeholder="1.0"
            step="0.1"
            min="0"
            max="10"
          />
        </label>
        <label>
          Balance
          <input
            type="number"
            name={"balance"}
            value={balance}
            onChange={this.handleChange}
          />
        </label>
        <button>Add Debt</button>
      </form>
    );
  }
}