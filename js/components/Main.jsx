import React from 'react';
import {
  Link
} from 'react-router';

class Main extends React.Component {

  render(){
    const activeStyle={textDecoration: 'none'}
    return <div>
        <section className="mainPage">
          <header>
            <p>LOGO</p>
            <nav className="nav">
              <ul>
                <li>
                  <Link to='/slider' activeStyle={activeStyle}>makroelementy</Link>
                </li>
                <li>
                  <Link to='/calc'>kalkulator</Link>
                </li>
                <li>
                  <Link to='/contact'>kontakt</Link>
                </li>
              </ul>
            </nav>
          </header>
          <main>
            <h1>Lorem Ipsum</h1>
            <div className="content">
              <p>
                Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym.
              </p>
              <div><div></div></div>
            </div>
          </main>
        </section>


    </div>
  }
}

module.exports = Main;
