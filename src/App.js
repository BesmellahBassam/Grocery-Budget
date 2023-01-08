import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  const list = JSON.parse(localStorage.getItem('list'));
  if(list) {
    return list;
  } else return [];
}

function App() {
  const [name,setName] = useState('');
  const [list,setList] = useState(getLocalStorage);
  const [isEditing,setIsEditing] = useState(false);
  const [editID,setEditID] = useState(null);
  const [alert,setAlert] = useState({
    show:false,
    msg:'',
    type:''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name) {
      //  Display error message in alert box;
        showAlert(true,'Invalid value','danger')

    } else if (name && isEditing) {
      //  Edit the item
      console.log('hello and hi');
        setList(list.map((item) => {
          if(item.id === editID) {
            return {...item,title:name}
          }
          return item
        }));
        setName('');
        setIsEditing(false)
        setEditID(null);
        showAlert(true,'value edited','success');
    } else {
      showAlert(true,'New Item Added','success');
      const newItem = {id:new Date().getTime().toString(),title:name};
      setList([...list,newItem]);
      setName('');
    }
  }

  const showAlert = (show=false,msg='',type='') => {
      setAlert({show,msg,type});
  }
  
  const clearList = () => {
    showAlert(true,'List Cleared','danger');
    setList([]);
  }

  const removeItem = (id) => {
    showAlert(true,'Item Removed','danger');
    setList(list.filter((item) => item.id !==id ))
  }

  const editItem = (id) => {
      const speceficItem = list.find((item) => item.id === id);
      setIsEditing(true);
      setEditID(id);
      setName(speceficItem.title);
  }

  useEffect(()=> {
      localStorage.setItem('list', JSON.stringify(list));
  },[list]);

   return  ( 
    <article className='section-center'>
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert}  list={list}/>  }
        <h3>Grocery bud</h3>
        <div className="form-control"> 
          <input 
            type="text" 
            placeholder='e.g eggs' 
            className='grocery'
            value={name} 
            onChange={(e) => setName(e.target.value)}
              />
            <button className='submit-btn' type='submit' >
              {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
        { list.length > 0 && 
        <div className="grocery-container">
          <List items={list} removeItem={removeItem}  editItem={editItem}/>
          <button className='clear-btn' onClick={clearList}>Clear All</button>
        </div>
      }
    </article>
   )
}

export default App
