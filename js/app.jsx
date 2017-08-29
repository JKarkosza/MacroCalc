import React from 'react';
import ReactDOM from 'react-dom';

class ProductInfo extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      products:[],
      loading: true,

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
        console.log(this.state.products);
        // console.log(parseFloat(this.state.products[0]['Białko']));

      })
  }

  handleChange = (event) => {
    const prote = this.state.products[event.target.value]['Białko']
    if(typeof prote == 'string'){
       prote.replace(',','.');
       console.log('done');
    }else {
        prote;
       console.log('number');
    }
    console.log(prote, typeof prote);

    // console.log(typeof this.state.products[event.target.value]['Białko']);
    // console.log(parseFloat(this.state.products[event.target.value]['Białko'].replace(',','.')));
  }

  render(){
    if(this.state.products.length == 0){
      return null;
    }
    const prodList = [];
    for (let prod in this.state.products){
      prodList.push(prod);
    }
    console.log(prodList);
    const optList = prodList.map((item, index) => {
      return <option key={index}>{item}</option>
    })
    const subStyle = {width: '25vw', height:'50px', marginTop:'2vh'}
    return <div>
      <select onChange={this.handleChange} style={{height:'50px', width:'25vw'}}>
        {optList}
      </select>
      <button type='submit' style={subStyle}>Dodaj</button>
    </div>
  }
}

class Calc extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      proteins: '',
      carbo: '',
      fats:'',
      kcal: '',
    }
  }

  render(){
    const calcStyle = {
      float:'right',
      width:'70vw',
      height:'50vh',
      border:'1px solid black',
      display:'flex',
      flexDirection:'row',
      alignItems: 'space-around',
      justifyContent: 'space-around',
      }

    return <div>
            <h1>Kalkulator makroelementów</h1>
            <div style={calcStyle}>
              <div>Produkt</div>
              <div>B</div>
              <div>W</div>
              <div>T</div>
              <div>Kcal</div>

            </div>
          </div>
  }
}



class App extends React.Component {
  render(){
    return <div>
        <Calc/>
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
