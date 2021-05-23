import axios from "axios";
import { Component } from "react";
import RowList from "./RowList";

class DetailsTable extends Component {

  state = {
    isLoading: true,
    apiResponse: {}
  }

  columns = [
    {
      id: "last_updated",
      color: "silver"
    },
    {
      id: "population",
      color: "#fff"
    },
    {
      id: "population_density",
      color: "#fff"
    },
    {
      id: "life_expectancy",
      color: "#fff"
    },
    {
      id: "median_age",
      color: "#fff"
    },
    {
      id: "aged_70_older",
      color: "#fff"
    },
    {
      id: "total_cases",
      color: "#fff"
    },
    {
      id: "new_cases_per_million",
      color: "#fff"
    },
    {
      id: "new_cases_smoothed",
      color: "#fff"
    },
    {
      id: "total_deaths",
      color: "#fff"
    },
    {
      id: "new_deaths_smoothed",
      color: "#fff"
    },
    {
      id: "total_vaccinations",
      sub: {
        id: "new_vaccinations",
        color: "green",
        prefix: "+"
      },
      color: "#fff"
    },
    {
      id: "people_fully_vaccinated",
      color: "#fff"
    },
    {
      id: "people_vaccinated",
      color: "#fff"
    },
    {
      id: "new_vaccinations_smoothed_per_million",
      color: "#fff"
    },
    {
      id: "diabetes_prevalence",
      color: "#fff"
    },
    {
      id: "male_smokers",
      color: "#fff"
    },
    {
      id: "female_smokers",
      color: "#fff"
    },
    {
      id: "gdp_per_capita",
      color: "#fff"
    },
    {
      id: "handwashing_facilities",
      color: "#fff"
    },
    {
      id: "icu_patients",
      color: "#fff"
    },
    {
      id: "weekly_icu_admissions",
      color: "#fff"
    },
    {
      id: "hosp_patients",
      color: "#fff"
    }
  ]

  constructor(props) {
    super(props);
  }

  fetchAPIHistory() {
    let apiUrl = process.env.REACT_APP_API_URL;
    return axios.get(apiUrl + "/locations/" + this.props.requestedCode + "/all");
  }

  componentDidMount() {
    this.fetchAPIHistory().then(
      response => {
        this.setState({
          apiResponse: response,
          isLoading: false
        })
      },
      error => { console.log("Could not obtain table data: " + error); }
    )
  }

  render() {
    let isLoading = this.state.isLoading;

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
              <th className="pl-2 pr-2 sm:text-sm sm:pl-3 sm:pr-3">Date Updated</th>
              <th className="pl-2 pr-2 sm:text-sm sm:pl-3 sm:pr-3">Population</th>
              <th className="pl-2 pr-2 sm:text-sm sm:pl-3 sm:pr-3">Population Density</th>
              <th className="pl-2 pr-2 sm:text-sm sm:pl-3 sm:pr-3">Life Expectancy</th>
              <th className="pl-2 pr-2 sm:text-sm sm:pl-3 sm:pr-3">Median Age</th>
              <th className="pl-2 pr-2 sm:text-sm sm:pl-3 sm:pr-3">Aged 70 or older</th>
              <th className="pl-2 pr-2 sm:text-sm sm:pl-3 sm:pr-3">Total Cases</th>
              <th className="pl-2 pr-2 sm:text-sm sm:pl-3 sm:pr-3">New Cases per Million</th>
              <th className="pl-2 pr-2 sm:text-sm sm:pl-3 sm:pr-3">New Cases Smoothed</th>
              <th className="pl-2 pr-2 sm:text-sm sm:pl-3 sm:pr-3">Total Deaths</th>
              <th className="pl-2 pr-2 sm:text-sm sm:pl-3 sm:pr-3">New Deaths Smoothed</th>
              <th className="pl-2 pr-2 sm:text-sm sm:pl-3 sm:pr-3">Total Vaccinations</th>
              <th className="pl-2 pr-2 sm:text-sm sm:pl-3 sm:pr-3">People Fully Vaccinated</th>
              <th className="pl-2 pr-2 sm:text-sm sm:pl-3 sm:pr-3">People Vaccinated</th>
              <th className="pl-2 pr-2 sm:text-sm sm:pl-3 sm:pr-3">New Vaccinations Smoothed per Million</th>
              <th className="pl-2 pr-2 sm:text-sm sm:pl-3 sm:pr-3">Diabetes Prevalence</th>
              <th className="pl-2 pr-2 sm:text-sm sm:pl-3 sm:pr-3">Male Smokers</th>
              <th className="pl-2 pr-2 sm:text-sm sm:pl-3 sm:pr-3">Female Smokers</th>
              <th className="pl-2 pr-2 sm:text-sm sm:pl-3 sm:pr-3">GDP Per Capita</th>
              <th className="pl-2 pr-2 sm:text-sm sm:pl-3 sm:pr-3">Handwashing Facilities</th>
              <th className="pl-2 pr-2 sm:text-sm sm:pl-3 sm:pr-3">Intensive Care Patients</th>
              <th className="pl-2 pr-2 sm:text-sm sm:pl-3 sm:pr-3">Weekly Intensive Care Admissions</th>
              <th className="pl-2 pr-2 sm:text-sm sm:pl-3 sm:pr-3">Hospitalized Patients</th>
            </tr>
          </thead>
          <tbody>
            <RowList clickableRow={false} columns={this.columns} data={apiResponse.data}></RowList>
          </tbody>
        </table>
      </div>
    )
  }
}

export default DetailsTable;

