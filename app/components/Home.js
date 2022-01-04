import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import data from './data.json';
import stockList from './stockList.js'
import 'regenerator-runtime/runtime';


export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state =  {
                    stocksData: data,
                    searchResults: [],
                    searchField : "",
                    stocksList : stockList
                  };
    this.addStock = this.addStock.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.isStockAdded = this.isStockAdded.bind(this);
  }

  isStockAdded(value){
    for ( let i = 0 ; i < stockList.length  ; i++ ) {
      if ( stockList[i][0] == value[0]) return true;
    }
    return false;
  }

  addStock(event,value){
    event.preventDefault();
    stockList.push(value)
    console.log(stockList)
  }

  deleteStock(event,value){
    event.preventDefault();
    for ( let i = 0 ; i < stockList.length  ; i++ ) {
      if ( stockList[i][0] == value[0]) stockList.splice(i);
    }
    console.log(stockList)
  }

  async handleChange(e) {
    let searchFieldValue = e.target.value
    await this.setState({searchField:""})
    await this.setState({searchField:searchFieldValue})
    let filteredStocks = []
    filteredStocks = data.filter(
     stock => {
        return (
          stock[0]
          .toLowerCase()
          .includes(this.state.searchField.toLowerCase())
        );
      }
    );
   await this.setState({searchResults:filteredStocks})
  };


  render() {

    return (
      <div>
        <form>
          <label>
            Name:
            <input type="text" name="name" onChange={this.handleChange}/>
            {this.state.searchResults.map(function(value,i){
             return (
              <div className={styles.flexRow}>
                <div>
                  <p className={styles.stockRow}>{value[0]} </p>
                </div>
                {
                  !this.isStockAdded(value) ? 
                  <button className={styles.button} onClick={(e) => {this.addStock(e,value);}}>
                  ADD
                  </button> :
                  <button className={styles.button} onClick={(e) => {this.deleteStock(e,value);}}>
                  DELETE
                  </button>
                }

              </div>
              )
            },this)}
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
