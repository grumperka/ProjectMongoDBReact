import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import authService from './api-authorization/AuthorizeService'
import 'regenerator-runtime/runtime'

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
                    <th>Edytuj</th>
                    <th>Usun</th>
                    <th>Rezerwacja</th>
          </tr>
        </thead>
        <tbody>
          {pokojeList.map(pokoj =>
            <tr key={pokoj.id}>
                  <td>{pokoj.nr_pokoju}</td>
                  <td>{pokoj.nazwa}</td>
                  <td>{pokoj.ile_osob}</td>
                  <td>{pokoj.cena}</td>
                  <td><Button variant="outline-warning" size="sm" value={pokoj.id} onClick={editPokoj}>Edytuj</Button></td>
                  <td><Button variant="outline-danger" size="sm" value={pokoj.id} onClick={deletePokoj}>Usun</Button></td>
                  <td><Button variant="outline-success" href={'/book/create?id=' + pokoj.id}>Zarezerwuj</Button></td>
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
            <Button variant="success" href="/addPokoj">
                Dodaj pokoj
                </Button>
            <br />
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
////////////////////////////////
const deletePokoj = (event) => {
    //alert('Look ' + event.target.value);

    let a = deleteData(event.target.value);
}

async function deleteData(idPokoj) {
    const token = await authService.getAccessToken();

    axios.delete(`/pokoj/Delete/` + idPokoj,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                'id': idPokoj
            }

        }).then(window.location.reload());



    return 0;
}
////////////////////////////////////
/*
const editPokoj = (event) => {
    //alert('Look ' + event.target.value);

    let a = editData(event.target.value);
}

async function deleteData(idPokoj) {
    const token = await authService.getAccessToken();

    axios.put(`/pokoj/Edit/` + idPokoj,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                'id': idPokoj
            }

        }).then(window.location.reload());



    return 0;
}*/
