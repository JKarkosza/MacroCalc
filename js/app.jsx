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
      totalProteins: 0,
      totalCarbs: 0,
      totalFats: 0,
      totalCalories: 0,
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
    const grams = event.target.value;
    if(grams === '150'){
      this.setState({
        protein: this.state.protein * 1.5,
        carbo: this.state.carbo * 1.5,
        fats: this.state.fats * 1.5,
        calories: this.state.calories * 1.5,
      })
    }else if(grams === '200'){
      this.setState({
        protein: this.state.protein * 2,
        carbo: this.state.carbo * 2,
        fats: this.state.fats * 2,
        calories: this.state.calories * 2,
      })
    }else if(grams === '250'){
      this.setState({
        protein: this.state.protein * 2.5,
        carbo: this.state.carbo * 2.5,
        fats: this.state.fats * 2.5,
        calories: this.state.calories * 2.5,
      })
    }else if(grams === '300'){
      this.setState({
        protein: this.state.protein * 3,
        carbo: this.state.carbo * 3,
        fats: this.state.fats * 3,
        calories: this.state.calories * 3,
      })
    }
  }

  handleSubClick = () => {

    let data = this.state.newRow;
    data.push({
        item: this.state.item,
        protein: this.state.protein,
        carbo: this.state.carbo,
        fats: this.state.fats,
        calories: this.state.calories,
      });
    this.setState({
      newRow: data,
      totalProteins: this.state.totalProteins + this.state.protein,
      totalCarbs: this.state.totalCarbs + this.state.carbo,
      totalFats: this.state.totalFats + this.state.fats,
      totalCalories: this.state.totalCalories + this.state.calories,
    });
  }

  handleRemove = (event) => {

    let newArr = this.state.newRow.filter((value,key)=>{
                    console.log(key, '::', event.target.dataset.index, " :: ",!(key == event.target.dataset.index));
                    return !(key == event.target.dataset.index);
                },1);
    console.log(newArr);
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

    const newData = this.state.newRow.map((elem, index) => {
      return <tr key={index}>
        <td>{elem.item}</td>
        <td>{elem.protein.toFixed(1)}</td>
        <td>{elem.carbo.toFixed(1)}</td>
        <td>{elem.fats.toFixed(1)}</td>
        <td>{elem.calories}</td>
        <td><button
          data-index={index}
          onClick={this.handleRemove}
          className="delBtn">X</button></td>
      </tr>
    })

    return <div className="mainDiv">
      <div className="mainBtnsContainer" >
        <select onChange={this.handleChange} className="mainBtns">
          <option defaultValue="Wybierz produkt">
            Wybierz produkt</option>
          {optList}
        </select>
        <select onChange={this.handleWeightChange} className="mainBtns">
          <option value="100" defaultValue>100 gram</option>
          <option value="150">150 gram</option>
          <option value="200">200 gram</option>
          <option value="250">250 gram</option>
          <option value="300">300 gram</option>
        </select>
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
              <td>{this.state.totalProteins.toFixed(1)}</td>
              <td>{this.state.totalCarbs.toFixed(1)}</td>
              <td>{this.state.totalFats.toFixed(1)}</td>
              <td>{this.state.totalCalories}</td>
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
