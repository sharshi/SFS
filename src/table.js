import React from "react";
import Form from "./form";

export default class Table extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };

    this.addDebt = this.addDebt.bind(this);
    this.removeDebt = this.removeDebt.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.allSelected = this.allSelected.bind(this);
    this.selectRow = this.selectRow.bind(this);
  }
  
  // onload, fetch data
  componentDidMount() {
    const url = "https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json";

    $.ajax({
      dataType: "json",
      url,
    }).then((res) => {
      this.setState({
        loaded: true,
        tradelines: res,
      });
    });
  }

  sumTotal() {
    let tradelines = this.state.tradelines.filter(line => line.selected);

    const total = tradelines.reduce((sum, val) => sum + val["balance"], 0);
    return `$${total.toFixed(2)}`;
  }

  handleSelect(e) {
    //set update row data as selected
    debugger
  }

  numRows() {
    return this.state.tradelines.length;
  }

  numSelected() {
    return this.state.tradelines.filter(row => row.selected).length;
  }

  addDebt(debt) {
    // Add the tradelines (banks) into the json (adding a row and display in the table)

    // add new ID
    debt.id = this.newId();

    let tradelines = this.state.tradelines;
    tradelines = tradelines.concat(debt);

    this.setState({
      loaded: true,
      tradelines,
    });
  }

  removeDebt() {
    let tradelines = this.state.tradelines;

    tradelines = tradelines.filter( line => !line.selected );

    this.setState({
      loaded: true,
      tradelines,
    });
  }

  newId() {
    return Math.max(this.state.tradelines.filter((row) => row.id)) + 1;
  }

  allSelected() {
    return this.numRows() === this.numSelected();
  }

  selectAll() {
      let tradelines = this.state.tradelines;
      const bool = this.allSelected() ? false : true;

      tradelines = tradelines.map(line => {
        line.selected = bool;
        return line;
      });

      this.setState({
        loaded: true,
        tradelines,
      });
  }

  selectRow(e) {
    const row = e.target.name;
    let tradelines = this.state.tradelines;

    tradelines = tradelines.map((line) => {

      // not full equality num == string
      if (line.id == row) {
        line.selected = line.selected ? false : true;
      }
      return line;
    });

    this.setState({
      loaded: true,
      tradelines,
    });
  }

  render(){
    if (!this.state.loaded) return 'Loading...';

    const tradelines = this.state.tradelines.map((row, idx) => {
      const keys = [
        'id',
        'creditorName', 
        'firstName',
        'lastName',
        'minPaymentPercentage',
        'balance'
      ];
      const formattedRow = keys.map((key, col) => {
        let value = row[key];
        if (key === "id") {
          return (
            <td key={`row-${idx}-col-${col}`}>
              <input
                type="checkbox"
                id="select-one"
                name={row[key]}
                checked={row['selected'] ? true : null}
                onChange={this.selectRow}
              />
            </td>
          );
        } else {
          if (key === "minPaymentPercentage") value ? value = `${value.toFixed(2)}%` : value = 0;
          if (key === "balance") value ? value = value.toFixed(2) : value = 0;
          return (
            <td
              key={`row-${idx}-col-${col}`}
              key={`row-${idx}-col-${col}`}
              className={`tc-${value}`}
            >
              {value}
            </td>
          );
        }
      });
      return (
        <tr key={`row-${idx}`}>
          {formattedRow}
        </tr>
      )
    })

    return (
      <>
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" id="select-all" onChange={this.selectAll} />
              </th>
              <th>Creditor</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Min Pay%</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>{tradelines}</tbody>
          <tfoot>
            {/* <tr>
              <td></td>
              <td id=""></td>
              <td id=""></td>
              <td id=""></td>
              <td id=""></td>
              <td id=""></td>
            </tr> */}
          </tfoot>
        </table>
        <button onClick={this.removeDebt}>Remove Debt</button>
        <Form addOneDebt={this.addDebt} />
        <div className="total">
          <p>Total</p>
          <p>{this.sumTotal()}</p>
        </div>
        <div className="summary">
          <p>Total Row Count: {this.numRows()}</p>
          <p>Check Row Count: {this.numSelected()}</p>
        </div>
      </>
    );
  }
} 