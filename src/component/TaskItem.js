import React, {Component} from 'react';
import DeleteImage from './../image/garbage.png';

class TaskItem extends Component {   
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const item = this.props.item;
        
        const imageStyle = {
            height: '20px',
            width: '20px',
            verticalAlign: 'middle'
        };
        const buttonStyle = {
            position: 'absolute', 
            right: 10,
        };

        const listStyle ={
            height:'50px'

        };

        const parastyle={
            padding:'35px'

        }
        return (
            <li style={listStyle}>
             <p> {item.name}
           <text>    Total:  </text>  {item.total}  <span style={buttonStyle}>
                    <button onClick={()=>this.props.deleteTask(item.name)}><img src={DeleteImage} alt="Delete" style={imageStyle} /></button>                
                </span>
             </p>
             <p>    {item.exchange}  </p>
                
            </li>
        );
    }
}

export default TaskItem;