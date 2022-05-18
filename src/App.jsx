import React, {Component} from 'react';
import CarCard from './CarCard';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      cars: [],
      newCar: {
        license_plate_number: "",
        brand: "",
        model: "",
        daily_cost: ""
      },
      errors: ""
    }
  }

  componentDidMount() {
    this.listCars();
  }

  listCars = () => {
    fetch("http://localhost:8000/api/cars").then(async response => {
      if (response.status === 200) {
        const data = await response.json();
        this.setState({
          cars: data.data
        })
      }
    })
  }

  license_plate_numberInput = (event) => {
    const newValue = event.target.value;
    const { newCar} = this.state;
    this.setState({
      newCar: {
        license_plate_number: newValue,
        brand: newCar.brand,
        model: newCar.model,
        daily_cost: newCar.daily_cost
      }
    })
  }

  brandInput = (event) => {
    const newValue = event.target.value;
    const { newCar } = this.state;
    this.setState ({
      newCar: {
        license_plate_number: newCar.license_plate_number,
        brand: newValue,
        model: newCar.model,
        daily_cost: newCar.daily_cost
      }
    })
  }

  modelInput = (event) => {
    const newValue = event.target.value;
    const  { newCar } = this.state;
    this.setState({
      newCar: {
        license_plate_number: newCar.license_plate_number,
        brand: newCar.brand,
        model: newValue,
        daily_cost: newCar.daily_cost
      }
    })
  }

  daily_costInput = (event) => {
    const newValue = event.target.value;
    const { newCar } = this.state;
    this.setState({
      newCar: {
      license_plate_number: newCar.license_plate_number,
      brand: newCar.brand,
      model: newCar.model,
      daily_cost: newValue
    }
    })
  }

  createNewCar = () => {
    const { newCar } = this.state;
    fetch('http://localhost:8000/api/cars', {
      method: "POST",
      headers: { 
      "Content-Type" : "application/json",
      "Accept" : "appliaction/json",
    },
    body: JSON.stringify(newCar)})
    .then(async response => {
      if(response.status === 201) {
        this.setState ({
          newCar: {
            license_plate_number: "",
            brand: "",
            model: "",
            daily_cost: ""
          }
        })
        this.listCars();
      } else {
        const data = await response.json();
        this.setState({
          errors: data.message
        })
      }
    })
  }

  render() {
    const { cars, newCar, errors } = this.state;
    const cardList = [];
    cars.forEach(car => {
      cardList.push(<CarCard car = {car} key={car.id}/>)
    })

    const errorAlert = <div className="alert alert-danger">
      {errors}
    </div>

    return (
      <div className="container">
        <header>
          <nav className="navbar navbar-expand">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a href="#car_form" className='nav-link'>Új autó felvétele</a>
                <a href="http://petrik.hu/" className='nav-link'>Petrik honlap</a>
              </li>
            </ul>
          </nav>
          <h1>Petrik Autó Kölcsönző</h1>
        </header>
        <main className='mt-3 mb-3'>

          <section className='row'> 
            {cardList}
          </section>

          <section id='car_form'> 
          <h2>Új autó felvétele</h2>

          {errors !== "" ? errorAlert : ""}

          <div className="mb-3">
            <label htmlFor="license_plate_number" className="license_plate_number">Rendszám:</label>
            <input type="text" className="form-control" placeholder='Rendszám'
            id="license_plate_number" value={newCar.license_plate_number} onInput={this.license_plate_numberInput}/>
          </div>

          <div className="mb-3">
            <label htmlFor="brand" className="brand">Márka:</label>
            <input type="text" className="form-control" placeholder='Márka'
            id="brand" value={newCar.brand} onInput={this.brandInput}/>
          </div>

          <div className="mb-3">
            <label htmlFor="model" className="model">Modell:</label>
            <input type="text" className="form-control" placeholder='Modell'
            id="model" value={newCar.model} onInput={this.modelInput}/>
          </div>

          <div className="mb-3">
            <label htmlFor="daily_cost" className="daily_cost">Napidíj:</label>
            <input type="number" className="form-control" placeholder='Napidíj'
            id="daily_cost" value={newCar.daily_cost} onInput={this.daily_costInput}/>
          </div>

          <div>
            <button className="btn btn-primary btn-lg" onClick={this.createNewCar}>Új autó</button>
          </div>


          </section>
        </main>

        <footer>Készítette: Balaska Klaudia</footer>
      </div>
    )
  }
}

export default App;
