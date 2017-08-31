import React from 'react';
import ReactDOM from 'react-dom';
import '../style.css';
import Main from './components/Main.jsx';
import Slider from './components/Slider.jsx';
import ProductInfo from './components/Calc.jsx';
import Contact from './components/Contact.jsx';
import NotFound from './components/NotFound.jsx';
import {Router,
  Route,
  Link,
  IndexLink,
  hashHistory
} from 'react-router';

class App extends React.Component {
  render(){
    return <Router history={hashHistory}>
            <Route path='/' component={Main} />
            <Route path='/slider' component={Slider} />
            <Route path='/calc' component={ProductInfo} />
            <Route path='/contact' component={Contact} />
            <Route path='*' component={NotFound} />
           </Router>
  }
}

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});
