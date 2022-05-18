import React, {Component} from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: "",
            success: false
        }
    }

    rent = () => {
        const { car } = this.props;
        fetch(`http://localhost:8000/api/cars/${car.id}/rent`, {
            method: "POST",
            headers: {
                "Accept" : "application/json"
            }
        }).then(async response => {
            if(response.status === 201) {
                this.setState({
                    success: true,
                    errors: ""
                });
                this.listCars();
            } else {
                const data = await response.json();
                this.setState({
                    success: false,
                    errors: data.message
                })
            }
        })
    }

    render() {
        const { car } = this.props;
        const { success, errors } = this.state;

        return (
            <div className="col-sm-12 col-md-6 col-lg-4 card">
                <div className="card-body">
                    <h2>{car.license_plate_number}</h2>
                    <p>Márka: {car.brand}</p>
                    <p>Modell: {car.model}</p>
                    <p>Napidíj: {car.daily_cost}</p>
                    <img src={`kepek/${car.brand}_${car.model}.png`} alt={car.model} className="img-fluid"/>
                    <div className="d-grid gap-2">
                        <button className="btn btn-primary mt-3" onClick={this.rent}>Kölcsönzés</button>
                    </div>
                    <p>
                        {success ? "Sikeres foglalás!" : errors !== "" ? errors: ""}
                    </p>
                </div>
            </div>
        )
    }
}

export default App;