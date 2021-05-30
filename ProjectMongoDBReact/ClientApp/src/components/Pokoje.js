import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'

export class Pokoje extends Component {
    static displayName = Pokoje.name;

  constructor(props) {
    super(props);
    this.state = { pokoje: [], loading: true };
  }

  componentDidMount() {
    this.populatePokojData();
  }

  static renderPokojeTable(pokojeList) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Nr. pokoju</th>
            <th>Nazwa</th>
            <th>Ile osob</th>
            <th>Cena</th>
          </tr>
        </thead>
        <tbody>
          {pokojeList.map(pokoj =>
            <tr key={pokoj.Id}>
              <td>{pokoj.nr_pokoju}</td>
                  <td>{pokoj.nazwa}</td>
                  <td>{pokoj.ile_osob}</td>
                  <td>{pokoj.cena}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
        : Pokoje.renderPokojeTable(this.state.pokoje);

    return (
      <div>
        <h1 id="tabelLabel" >Lista pokoi</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populatePokojData() {
    const token = await authService.getAccessToken();
    const response = await fetch('pokoj', {
      headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
      this.setState({ pokoje: data, loading: false });
  }
}
