import React, { Component } from 'react';
import ToDoList from './ToDoList';
import '../css/App.css';
import axios from 'axios';
import Dropdown from 'react-dropdown';


class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.changeview=this.changeview.bind(this);
    this.convert=this.convert.bind(this);
    this.newapi=this.newapi.bind(this);
    this.initialize=this.initialize.bind(this);
  }

  state = {
    allcurrencies:[], 
    allrates:{},
    items: [],
    isadd: false,
    selected:"USD"
  };

  //API Call USD
  componentDidMount(){
    let initial = {};
    let arr =[]
		let cURL = 'https://api.exchangeratesapi.io/latest?base=USD';
		axios.get(cURL)
		.then(response => {
			initial = response.data;
      for(var c in initial.rates){
        arr.push(c);
      }
      this.setState({
        allcurrencies:arr,
        allrates:initial.rates
      });
		})
		.catch(error => {
			console.log(error);
    });
   this.initialize();
  }

  initialize(){
    let dup=["IDR","EUR","GBP","SGD"];
    let amount='10';
    let newamt=parseFloat(amount);
    let newarray=[];
   for( var i = 0; i < dup.length ; i++){
    let name=dup[i].toString();
    let exc =this.state.allrates[name];
    let e=parseFloat(exc);
    let ttl=newamt*e;
    newarray.push({
      name:name,
      exchange:exc,
      total:ttl
    });
    this.setState({
      items:newarray
    });
   }
  }

  addItem(event) {
    event.preventDefault();
    let Type = this.newTaskInput.value.trim().toUpperCase();
    let t=Type.toString();
    let a=this.newamount.value.trim()
    let amt=parseFloat(a);
    if(Type !== "" && this.state.allcurrencies.includes(Type)) {
      let items = this.state.items;
      let exc= this.state.allrates[t];
      let e=parseFloat(exc);
      let ttl= amt*e;
      items.push({
        name: Type,
        exchange: exc,
        total:ttl
      });
      this.setState({items});
    }
    this.newTaskInput.value = "";
    this.newTaskInput.focus();
  }

  deleteItem(name) {
    let filteredItems = this.state.items.filter((item)=>item.name!==name);
    this.setState({items:filteredItems});
  }

  convert(event){
    event.preventDefault();
    let dup=[...this.state.items];
    let n=dup.map((du)=>du.name);
    let amount=this.newamount.value.trim();
    let newamt=parseFloat(amount);
    let newarray=[];
   for( var i = 0; i < n.length ; i++){
    let name=n[i].toString();
    let exc =this.state.allrates[name];
    let e=parseFloat(exc);
    let ttl=newamt*e;
    newarray.push({
      name:name,
      exchange:exc,
      total:ttl
    });
    this.setState({
      items:newarray
    });
   }
  }

  changeview(){
    this.setState({isadd: true})
    console.log(this.state.allrates);
    }

  newapi(option){
      this.setState({selected:option});
      let input=option.value.trim().toString();
      let initial = {};
      let arr =[]
      let cURL = 'https://api.exchangeratesapi.io/latest?base=';
     let URL=cURL.concat(input);
      axios.get(URL)
      .then(response => {
        initial = response.data;
        for(var c in initial.rates){
          arr.push(c);
        }
        this.setState({
          allcurrencies:arr,
          allrates:initial.rates
        });
      })
      .catch(error => {
        console.log(error);
      });
      
    }
   

  render() { 
    const options=[...this.state.allcurrencies];
    if(!this.state.isadd){
    return (
 <div className="App-intro">
 <p> <Dropdown options={options} value={this.state.selected} className="dropdown" onChange={this.newapi}/> </p>
 <p>
 <input type="number" defaultValue='10' onChange={this.convert} ref={(e)=>this.newamount=e}></input>
 </p>
      <div className="App"> 
          <ToDoList 
            items={this.state.items} 
            deleteTask={this.deleteItem} />
        <div>
              <button type="submit" onClick={this.changeview}>Add new currency</button>
          </div>   
      </div>
        </div>
    );
  }else{
    return(
        <div className="App-intro">
   <p> <Dropdown options={options} value={this.state.selected} className="dropdown" onChange={this.newapi} /> </p>
   <p>
   <input type="number" defaultValue='10' onChange={this.convert} ref={(e)=>this.newamount=e}></input>
   </p>
        <div className="App"> 
            <ToDoList 
              items={this.state.items} 
              deleteTask={this.deleteItem} />
   <form onSubmit={this.addItem}>
<p> <input type="text" placeholder="Add Currency by its name e.g. AUD, JPY" ref={(e)=>this.newTaskInput=e} className="ToDoInput"/> </p>
 <button type="submit" className="ToDoSubmit">Add</button>
</form>  
        </div>
          </div>
    );
  }
  }

}

export default App;
