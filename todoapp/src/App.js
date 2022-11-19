import React ,{ useEffect, useState } from 'react';
import './App.css';
import {AiOutlineDelete}from 'react-icons/ai';
import {BsCheckCircle} from 'react-icons/bs';


function App() {
  const [iscompletescreen,setiscompletescreen]= useState(false);
  const [alltodo,settodo]= useState([]);
  const [newtitle,setnewtitle]= useState('');
  const [newdescription,setnewdescription]=useState('');
  const [completedtodo,setcompletedtodo]=useState('');
  /*const [darkMode, setDarkMode] = useState(false);*/

  const handleaddtodo=()=>{
    let newtodoitem={
      title:newtitle,
      description:newdescription,
    }
    let updatedtodoArr=[...alltodo];
    updatedtodoArr.push(newtodoitem);
    settodo(updatedtodoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedtodoArr));
    

  };
  const handledelete=index=>{
    let reducedtodo=[...alltodo];
    reducedtodo.splice(index);
    localStorage.setItem('todolist',JSON.stringify(reducedtodo));
    settodo(reducedtodo);
  };


  const handlecompletedelete=(index)=>{
    let reducedtodo=[...completedtodo];
    reducedtodo.splice(index);
    localStorage.setItem('completedtodo',JSON.stringify(reducedtodo));
    setcompletedtodo(reducedtodo);

  };
  const handlecomplete=index=>{
    let now=new Date();
    let dd=now.getDate();
    let mm=now.getMonth()+1;
    let yyyy=now.getFullYear();
    let h=now.getHours();
    let m=now.getMinutes();
    let s=now.getSeconds();

    let completedon=dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m +':'+ s;

    let filtereditem={
      ...alltodo[index],completedon:completedon
    };
    let updatedtodoArr=[...completedtodo];
    updatedtodoArr.push(filtereditem);
    setcompletedtodo(updatedtodoArr);
    handledelete(index);
    localStorage.setItem('completedtodo',JSON.stringify(updatedtodoArr));
  };

  useEffect(()=>{
    let savedtodo=JSON.parse(localStorage.getItem('todolist'));
    let savedcompletedtodo=JSON.parse(localStorage.getItem('completedtodo'));
    if(savedtodo){
      settodo(savedtodo);
    }
    if(savedcompletedtodo){
      setcompletedtodo(savedcompletedtodo);
    }
  },[]);
  


  return (
      
    
      <div className="App">
  
      <h1>My TodoApp</h1>
      
      <div className='My-todoapp'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Tasks</label>
            <input type="text" value={newtitle} onChange={(e)=>setnewtitle(e.target.value)} placeholder='what is the task'/>
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type="text" value={newdescription} onChange={(e)=>setnewdescription(e.target.value)} placeholder='what is the task descripiton'/>
          </div>
          <div className='todo-input-item'>
           <button type ='button' onClick={handleaddtodo} className='primarybutton'>Add</button>
          </div>
        </div>

        <div className='button-area'>
          <button className={`iscompletescreen ${iscompletescreen===false && 'active'}`}onClick={()=>setiscompletescreen(false)}>Pending</button>
          <button className={`iscompletescreen ${iscompletescreen===true && 'active'}`}onClick={()=>setiscompletescreen(true)}>Completed</button>
        </div>
        <div className='todo-list'>
          {iscompletescreen===false && alltodo.map((item,index)=>{
            return (
              <div className='todo-list-item' key={index}>

              <div>
                <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>

            <div>
              <AiOutlineDelete className="icon" onClick={()=>handledelete(index)} title="delete?"/>
              <BsCheckCircle className="check-icon" onClick={()=>handlecomplete(index)} title ="complete?"/>
            </div>
            </div>
            )
          })}

             {iscompletescreen===true && completedtodo.map((item,index)=>{
            return (
              <div className='todo-list-item' key={index}>

              <div>
                <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p><small>completed on:{item.completedon}</small></p>
            </div>

            <div>
              <AiOutlineDelete className="icon" onClick={()=>handlecompletedelete(index)} title="delete?"/>
              
            </div>
            </div>
            )
          })}
         
        </div>
      </div>
     
    </div>
    
  );
}

export default App;
