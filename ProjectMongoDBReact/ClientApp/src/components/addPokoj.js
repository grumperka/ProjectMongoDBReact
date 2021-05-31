import React, { Component } from 'react';
import axios from 'axios';
import authService from './api-authorization/AuthorizeService'

export class addPokoj extends Component {
    static displayName = addPokoj.name;

    constructor(props) {
        super(props);
        this.state = { nrPokoju: '', nazwaPokoju: '', ileOsobPokoju: '', cenaPokoju: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.nrPokojuInput = React.createRef();
        this.nazwaPokojuInput = React.createRef();
        this.ileOsobPokojuInput = React.createRef();
        this.cenaPokojuInput = React.createRef();

    }

    handleChange(event) {
        this.setState({
            nrPokoju: this.nrPokojuInput.current.value,
            nazwaPokoju: this.nazwaPokojuInput.current.value,
            ileOsobPokoju: this.ileOsobPokojuInput.current.value,
            cenaPokoju: this.cenaPokojuInput.current.value
        });
    }

    handleSubmit(event) {
        alert('Dodano pokoj: ' + this.state.nazwaPokoju);
        event.preventDefault();
        this.postData();
    }

    async postData() {
        const token = await authService.getAccessToken();

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const Pokoj = {  //obiekt do przesłania
            'Id': 'brak',
            'nr_pokoju': parseInt(this.state.nrPokoju, 10),
            'nazwa': this.state.nazwaPokoju,
            'ile_osob': parseInt(this.state.ileOsobPokoju, 10),
            'cena': parseInt(this.state.cenaPokoju, 10)
        }

        axios({
            method: 'post', //metoda przesłania z axios
            url: `https://localhost:44334/pokoj`, //adres do przesłania
            headers: { Authorization: `Bearer ${token}` },
            data: Pokoj //dane do przesłania
        })

       /* axios.post(`https://localhost:44334/pokoj`, { Pokoj }, config)
            .then(res => {
                console.log(res);
                console.log(res.data);
            }) */
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Nr. pokoju:
                        <input type="text" name="nr_pokoju" value={this.state.nrPokoju} ref={this.nrPokojuInput} onChange={this.handleChange}/>
                    </label><br />
                    <label>
                        Nazwa:
                        <input type="text" name="nazwa" value={this.state.nazwaPokoju} ref={this.nazwaPokojuInput} onChange={this.handleChange} />
                    </label><br />
                    <label>
                        Ile osób:
                        <input type="text" name="ile_osob" value={this.state.ileOsobPokoju} ref={this.ileOsobPokojuInput} onChange={this.handleChange}/>
                    </label><br />
                    <label>
                        Cena:
                        <input type="text" name="cena" value={this.state.cenaPokoju} ref={this.cenaPokojuInput} onChange={this.handleChange}/>
                    </label><br />
                    <input type="submit" value="Wyślij" />
                </form>
            </div>
        );
    }
}