import React from 'react';
import ReactDOM from 'react-dom';
import '../style.css';

class ProductInfo extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      products:[],
      loading: true,
      item: '',
      protein: '',
      carbo: '',
      fats: '',
      calories: '',
      newRow: [],

      curWeigth: "100",

      totalMacro:[],
      totalProteins: [],
      totalCarbs: [],
      totalFats: [],
      totalCalories: [],
    }
  }

  componentDidMount(){
    fetch('http://localhost:3000/products')
      .then( p => p.json())
      .then( data => {
        this.setState({
          products: data,
          loading: false,
        })
      })
  }

  parseDataToNumber = (data) => {
    if( typeof data != 'number' && data !== 0 ){
      return parseFloat(data.replace(',','.'));
    }else {
      return data;
    }
  }

  handleChange = (event) => {
    const item = event.target.value;
    const prote = this.state.products[event.target.value]['Białko'];
    const carbs = this.state.products[event.target.value]['Węgle'];
    const fatos = this.state.products[event.target.value]['Tłuszcze'];
    const calories = this.state.products[event.target.value]['Kcal'];

     this.setState({
       item: item,
       protein: this.parseDataToNumber(prote),
       carbo: this.parseDataToNumber(carbs),
       fats: this.parseDataToNumber(fatos),
       calories: calories,
     });
  }

  handleWeightChange = (event) => {
      this.setState({
        curWeigth: event.target.value
      })
  }

  handleSubClick = () => {
    if(this.state.curWeigth === "" || this.state.curWeigth === 0){
      this.setState({
        curWeigth: 100
      })
    }

  {/* Suma makro*/}
    let totalProteinsCopy = this.state.totalProteins;
    totalProteinsCopy.push({
      totalProteins: this.state.protein,
    })

    let totalCarbsCopy = this.state.totalCarbs;
    totalCarbsCopy.push({
      totalCarbs: this.state.carbo,
    })

    let totalFatsCopy = this.state.totalFats;
    totalFatsCopy.push({
      totalFats: this.state.fats,
    })

    let totalCaloriesCopy = this.state.totalCalories;
    totalCaloriesCopy.push({
      totalCalories: this.state.calories,
    })






  {/* Nowy wiersz*/}
    let data = this.state.newRow;
    data.push({
        item: this.state.item,
        protein: this.state.protein,
        carbo: this.state.carbo,
        fats: this.state.fats,
        calories: this.state.calories,
        weight: this.state.curWeigth,
      });
    this.setState({
      newRow: data,
      totalProteins: totalProteinsCopy,
      totalCarbs: totalCarbsCopy,
      totalFats: totalFatsCopy,
      totalCalories: totalCaloriesCopy,
      curWeigth: '100',
    });
  }

  handleRemove = (event) => {
    let newArr = this.state.newRow.filter((value,key)=>{
                    return !(key == event.target.dataset.index);
                },1);
    this.setState({
      newRow: newArr,
    })
  }



  render(){

    if(this.state.products.length == 0){
      return null;
    }
    const prodList = [];
    for (let prod in this.state.products){
      prodList.push(prod);
    }
    const optList = prodList.map((item, index) => {
      return <option key={index}>{item}</option>
    })

    const sumOfProteins = this.state.totalProteins.map(elem  => {
      return elem.totalProteins }).reduce((prev, curr) => {
      return prev + curr },0);

    const sumOfCarbs = this.state.totalCarbs.map(elem  => {
      return elem.totalCarbs }).reduce((prev, curr) => {
      return prev + curr },0);

    const sumOfFats = this.state.totalFats.map(elem  => {
      return elem.totalFats }).reduce((prev, curr) => {
      return prev + curr },0);

    const sumOfCalories = this.state.totalCalories.map(elem  => {
      return elem.totalCalories }).reduce((prev, curr) => {
      return prev + curr },0);

    const newData = this.state.newRow.map((elem, index) => {
      return <tr key={index}>
        <td>{elem.item}</td>
        <td>{(elem.protein * (elem.weight/100)).toFixed(1)}</td>
        <td>{(elem.carbo * (elem.weight/100)).toFixed(1)}</td>
        <td>{(elem.fats * (elem.weight/100)).toFixed(1)}</td>
        <td>{elem.calories * (elem.weight/100)}</td>
        <td><button
          data-index={index}
          onClick={this.handleRemove}
          className="delBtn"
          >X</button></td>
      </tr>
    })

    return <div className="mainDiv">
      <div className="mainBtnsContainer" >
        <select onChange={this.handleChange} className="mainBtns">
          <option defaultValue="Wybierz produkt">
            Wybierz produkt
          </option>
          {optList}
        </select>
        <input
          type="number"
          placeholder="Wpisz wagę produktu"
          value={this.state.curWeigth}
          onChange={this.handleWeightChange}
          className="mainBtns"/>

        <button
          type='submit'
          onClick={this.handleSubClick}
          className="subBtn"
          disabled={!this.state.item}
          >Dodaj</button>
      </div>

      <div className="table-responsive tab">
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Proteins</th>
              <th>Carbs</th>
              <th>Fats</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody>
            {newData}
          </tbody>
          <tfoot>
            <tr>
              <td>Suma</td>
              <td>{sumOfProteins.toFixed(2)}</td>
              <td>{sumOfCarbs.toFixed(2)}</td>
              <td>{sumOfFats.toFixed(2)}</td>
              <td>{sumOfCalories}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>

  }
}

class App extends React.Component {
  render(){
    return <div>
        <ProductInfo />
    </div>
  }
}

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});
