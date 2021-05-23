import { Component } from "react";


class RowList extends Component {
  constructor(props) {
    super(props);
  }

  buildColumnValue(item, col) {
    let itemVal = item[col.id];
    if (itemVal === 0) {
      return (
        <span className="text-red-600">Unknown</span>
      );
    }

    if ('sub' in col) {
      let subItemVal = item[col.sub.id];

      return (
        <div className="cell-wrapper flex flex-col pb-2">
          <span className="main-value" style={{color: col.color}}>{itemVal}</span>
          {subItemVal !== 0 && (
            <span className="sub-value" style={{color: col.sub.color}}>{col.sub.prefix + subItemVal}</span>
          )}
        </div>
      )
    }

    return (
      <div className="cell-wrapper">
        <span className="main-value" style={{color:  col.color}}>{itemVal}</span>
      </div>
    )
  }

  handleRowClick(code) {
    if (!this.props.clickableRow) {
      return;
    }
    this.props.onRowClick(code);
  }

  render() {
    let data = this.props.data;
    let columns = this.props.columns;

    return (
      data.map(item => (
        <tr onClick={() => this.handleRowClick(item.country_code)} key={item.country_code} className={`text-center ${this.props.clickableRow ? "cursor-pointer" : "cursor-default"}`}>
          {columns.map(col => (
            <td className="text-center pl-2 pr-2" key={col.id}>{this.buildColumnValue(item, col)}</td>
          ))}
        </tr>
      ))
    );
  }
}

export default RowList;
