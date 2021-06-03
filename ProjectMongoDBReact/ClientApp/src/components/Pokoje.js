import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import $ from 'jquery';
import authService from './api-authorization/AuthorizeService'
import 'regenerator-runtime/runtime'

export class Pokoje extends Component {
    static displayName = Pokoje.name;

  constructor(props) {
    super(props);
      this.state = { pokoje: [], loading: true, show: false };

      this.onInputchange = this.onInputchange.bind(this);
      this.handleChecked = this.handleChecked.bind(this);
    }


  componentDidMount() {
    this.populatePokojData();
    }

    onInputchange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleChecked = () => {
        this.setState({ show: !this.state.show });
        console.log(this.state.show);
    }
  

  static renderPokojeTable(pokojeList,showM) {
      return (
          this.toggle_button = [],
          <table className='table table-striped' aria-labelledby="tabelLabel">
              <thead>
                  <tr>
                      <th>Nr. pokoju</th>
                      <th>Nazwa</th>
                      <th>Ile osob</th>
                      <th>Cena</th>
                      <th style={showM === false ? { display: 'none' } : {}}>Edytuj</th>
                      <th style={showM === false ? { display: 'none' } : {}}>Usun</th>
                      <th style={showM === true ? { display: 'none' } : {}}>Rezerwacja</th>
                  </tr>
              </thead>
              <tbody>
                  {pokojeList.map(pokoj =>
                      <tr key={pokoj.id}>

                          {showM === true ?
                          <td> <input type="text" id={pokoj.id + '_nr_pokoju'} defaultValue={pokoj.nr_pokoju} onChange={this.onInputchange} style={{ background_color: "inherit", border: "0" }} /> </td>
                              : <td>{pokoj.nr_pokoju}</td>}

                          {showM === true ?
                          <td><input type="text" id={pokoj.id + '_nazwa'} defaultValue={pokoj.nazwa} style={{ background_color: "inherit", border: "0" }} /></td>
                              : <td>{pokoj.nazwa}</td>}

                          {showM === true ?
                              <td><input type="text" id={pokoj.id + '_ile_osob'} defaultValue={pokoj.ile_osob} style={{ background_color: "inherit", border: "0" }} /></td>
                              : <td>{pokoj.ile_osob}</td>}

                          {showM === true ?
                          <td><input type="text" id={pokoj.id + '_cena'} defaultValue={pokoj.cena} style={{ background_color: "inherit", border: "0" }} /></td>
                              : <td>{pokoj.cena}</td>}
                              
                          <td style={showM === false ? { display: 'none' } : {} }><Button variant="outline-warning" size="sm" value={pokoj.id} onClick={editPokoj}>Edytuj</Button></td>
                          <td style={showM === false ? { display: 'none' } : {} }><Button variant="outline-danger" size="sm" value={pokoj.id} onClick={deletePokoj}>Usun</Button></td>

                         
                          <td style={showM === true ? { display: 'none' } : {}}><Button variant="outline-success" href={'/book/create?id=' + pokoj.id}>Zarezerwuj</Button></td>
                          
              </tr>
                  )} 
        </tbody>
          </table>


      );
  }

  render() {
    let contents = this.state.loading
        ? <p><em>Loading...</em></p>
        : Pokoje.renderPokojeTable(this.state.pokoje, this.state.show);

    return (
      <div>
            <h1 id="tabelLabel" >Lista pokoi</h1>
            <Button variant="success" href="/addPokoj">
                Dodaj pokoj
                </Button>
            <br /><br />
            <Button onClick={this.handleChecked}> Modul edycyjny
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
const editPokoj = (event) => {
    //alert('Look ' + event.target.value);

    alert(document.getElementById(event.target.value + '_nazwa').value);
}


