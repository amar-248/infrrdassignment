import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';

let items =[

  {item:"item6",quantity:80},
  {item:"item7",quantity:60},
  {item:"item8",quantity:120},
  {item:"item9",quantity:300},
  {item:"item10",quantity:310},
  {item:"item11",quantity:70},
  {item:"item12",quantity:620},
  {item:"item13",quantity:340},
  {item:"item14",quantity:340},
  {item:"item15",quantity:355},
  {item:"item16",quantity:3045},
  {item:"item17",quantity:35},
  {item:"item18",quantity:304},
  {item:"item19",quantity:32},
  {item:"item20",quantity:3}
];

class App extends Component{

  constructor(){
    super();
    this.state = {
      selectedIndex:0,
      selected:items[0].item,
      itemChanged :"",
      itemNewQuantity:0,
      itemChangedIndex:0,
      addClicked:false,
      editNameOn:false,
      editQuanOn:false
    }
  }

  selectChanged = (e)=>{
    this.setState({
      selected : e.target.value,
      editNameOn:false,
      editQuanOn:false,
      selectedIndex : e.target.selectedIndex
    })
  }

  changeItem = e =>{
    this.setState({
      itemChanged : e.target.value,
      itemChangedIndex : this.state.selectedIndex,
      editNameOn:true
    })
  }

  changeItemQuantity = e =>{
    this.setState({
      itemNewQuantity : e.target.value,
      itemChangedIndex : this.state.selectedIndex,
      editQuanOn:true
    })
  }

  updateClicked = () =>{
    if(this.state.editNameOn || this.state.editQuanOn){
      if (window.confirm("Are you sure to update item details")) {
        items[this.state.itemChangedIndex].quantity = this.state.itemNewQuantity > 0 ? this.state.itemNewQuantity :  items[this.state.itemChangedIndex].quantity;
        items[this.state.itemChangedIndex].item = this.state.itemChanged !="" ? this.state.itemChanged :  items[this.state.itemChangedIndex].item
        this.setState({
          itemChangedIndex : 0,
          itemNewQuantity:0,
          itemChanged:"",
          editNameOn:false,
          editQuanOn:false
        })
        }
    }
    else{
      alert("Change Name or Quantity to update");
    }
    
  
  }

  deleteClicked = e =>{
    if (window.confirm("Are you sure to delete the item")) {
   
      if(this.state.selectedIndex == items.length-1){
        items.pop();
        this.setState({
          editNameOn:false,
          editQuanOn:false,
          selectedIndex:0
        })
      }
      else{
        this.setState({
          editNameOn:false,
          editQuanOn:false,
        })
        items.splice(this.state.selectedIndex,1);
        this.forceUpdate();
      }
     
    }
    

  }
  addItem = e =>{
    this.setState({
      addClicked:true
    })
  }

  saveClicked = ()=>{
    if(this.refs.newItem.value.length < 3 || this.refs.newQuan.value.length < 1 || this.refs.newQuan.value < 0 ){
      alert("please enter all fields and item should be more than 3 charcters");
    }
    else{
      items.push({item:this.refs.newItem.value,quantity:this.refs.newQuan.value})
      alert("item saved ")
      this.setState({
        addClicked:false
      })
    }
  }
  render(){
    return (
      <React.Fragment>
        <div className="selectClass">
        <h2>Shopping Cart</h2>
          <div className="avail-items">
            <h1>Available Items</h1>
            <select onChange={this.selectChanged} value={this.state.itemChanged.length > 0 ? this.state.itemChanged : items[this.state.selectedIndex].item}>
              {items.map((i,index)=>{
                return(
                  <option key= {index}>{i.item}</option>
                )
                })
              }
          </select> 
          <button className="addButton" onClick={this.addItem}>Add</button>
          </div>
      </div>
      
     {this.state.selected.length > 0 && !this.state.addClicked && <div className="selected-item"> 
          <div className="itemSelect">
             <label> Item Selected  </label> 
             <input type="text" onChange={this.changeItem} value={this.state.itemChanged.length > 0  || this.state.editNameOn ? this.state.itemChanged : items[this.state.selectedIndex].item}></input> 
           <label className="moveLeft">Item Selected Quantity  </label><input type="number" onChange={this.changeItemQuantity} value={this.state.itemNewQuantity > 0 || this.state.editQuanOn ? this.state.itemNewQuantity : items[this.state.selectedIndex].quantity}></input> 
           
          </div>
          <button onClick={this.updateClicked}>Update</button>
          <button onClick={this.deleteClicked}>Delete</button>
          
      </div>}
          
     {this.state.addClicked && <div className="addContainer">
       <div className="addCOntainer-inner">
          <label>Enter new Item</label>
          <input ref="newItem" type="text" ></input>
          <label  className="moveLeft">Enter new Quantity</label>
          <input ref="newQuan" type="number" ></input>
          <button onClick={this.saveClicked}>Save</button>
       </div>
     </div>}
        
      </React.Fragment>
    )
  }

}

export default App;
