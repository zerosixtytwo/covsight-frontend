import axios from "axios";
import { Component } from "react";
import { Redirect } from "react-router";
import RowList from "./RowList";

class MainTable extends Component {

  state = {
    isLoading: true,
    apiResponse: {},
    requestedRedirect: false,
    selectedCode: ""
  }

  columns = [
    {
      id: "name",
      color: "#fff"
    },
    {
      id: "total_cases",
      sub: {
        id: "new_cases",
        color: "#ef474a",
        prefix: "+"
      },
      color: "#fff"
    },
    {
      id: "total_deaths",
      sub: {
        id: "new_deaths",
        color: "#ef474a",
        prefix: "+"
      },
      color: "#fff"
    },
    {
      id: "total_vaccinations",
      color: "#f2d77d"
    },
    {
      id: "people_fully_vaccinated",
      color: "#a8f762"
    },
    {
      id: "people_vaccinated",
      color: "#f7b262"
    },
    {
      id: "icu_patients",
      color: "#899bc1"
    },
    {
      id: "hosp_patients",
      color: "#899bc1"
    }
  ]

  constructor(props) {
    super(props);

    this.handleRowClick = this.handleRowClick.bind(this);
  }

  fetchAPIData() {
    let apiUrl = process.env.REACT_APP_API_URL;
    return axios.get(apiUrl + "/locations/all")
  }

  componentDidMount() {
    this.fetchAPIData().then(
      response => {
        this.setState({
          apiResponse: response,
          isLoading: false
        })
      },
      error => { alert("Could not obtain table data: " + error); }
    )
  }

  handleRowClick(code) {
    this.setState({
      selectedCode: code,
      requestedRedirect: true
    });
  }

  render() {
    let requestedRedirect = this.state.requestedRedirect;
    let isLoading = this.state.isLoading;

    if (requestedRedirect) {
      let selectedCode = this.state.selectedCode;
      let nextRoute = "/data/" + selectedCode;
      return <Redirect to={nextRoute} />
    }

    if (isLoading) {
      return (
        <p className="text-green-400 text-center mt-4">Loading...</p>
      )
    }

    let apiResponse = this.state.apiResponse;

    return (
      <div className="main-table-wrapper p-3 overflow-x-auto bg-gray-900 rounded-lg border-2 border-gray-500 mt-6">
        <table className="m-auto">
          <thead>
            <tr>
              <th className="pl-2 pr-2 sm:text-sm sm:pl-3 sm:pr-3">Name</th>
              <th className="pl-2 pr-2 sm:text-sm sm:pl-3 sm:pr-3">Total Cases</th>
              <th className="pl-2 pr-2 sm:text-sm sm:pl-3 sm:pr-3">Total Deaths</th>
              <th className="pl-2 pr-2 sm:text-sm sm:pl-3 sm:pr-3">Total Vaccinations</th>
              <th className="pl-2 pr-2 sm:text-sm sm:pl-3 sm:pr-3">People Fully Vaccinated</th>
              <th className="pl-2 pr-2 sm:text-sm sm:pl-3 sm:pr-3">People Vaccinated</th>
              <th className="pl-2 pr-2 sm:text-sm sm:pl-3 sm:pr-3">Intensive Care Patients</th>
              <th className="pl-2 pr-2 sm:text-sm sm:pl-3 sm:pr-3">Hospitalized Patients</th>
            </tr>
          </thead>
          <tbody>
            <RowList clickableRow={true} onRowClick={this.handleRowClick} columns={this.columns} data={apiResponse.data.sort((i1, i2) => i2.total_cases - i1.total_cases)}></RowList>
          </tbody>
        </table>
      </div>
    )
  }
}

export default MainTable;
