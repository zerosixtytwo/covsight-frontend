import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import DetailsTable from "../components/DetailsTable";
import { Logo } from "../components/Logo";

class Data extends Component {

  state = {
    isLoading: true,
    apiResponse: {},
    locationExists: false
  };

  code = "";

  constructor(props) {
    super(props);

    this.code = this.props.match.params.code;
  }

  fetchAPILocations() {
    let apiUrl = process.env.REACT_APP_API_URL;
    return axios.get(apiUrl + "/locations");
  }

  componentDidMount() {
    this.fetchAPILocations().then(
      response => {
        this.setState({
          apiResponse: response,
          isLoading: false,
          locationExists: response.status === 200
        })
      },
      error => { console.log("Data not found: " + error) }
    )
  }

  render() {
    let isLoading = this.state.isLoading;
    if (isLoading) {
      return (
        <p className="text-green-400 text-center mt-4">Loading...</p>
      )
    }

    let locationExists = this.state.locationExists;
    if (!locationExists) {
      return (
        <p className="text-green-400 text-center mt-4">An error occurred! No data was found.</p>
      );
    }

    let locationName = "";
    this.state.apiResponse.data.forEach(item => {
      if (item.code === this.code) locationName = item.name;
    })

    return (
      <div className="w-10/12 sm:w-11/12 m-auto p-3">
        <Logo />
        <Link className="mt-4 block" to="/">← Torna alla Home</Link>
        <h3 className="text-center mt-4 text-2xl">{locationName}</h3>
        <DetailsTable requestedCode={this.code} />
      </div>
    );
  }
}

export default Data;
