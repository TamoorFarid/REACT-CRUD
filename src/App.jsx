import './App.css';
import { Button, Divider, List } from 'antd';
import Search from 'antd/es/input/Search';
import { useState } from 'react';
import CustomModal from './modal';

function App() {
  const [task, setTask] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showModal,setShowModal] = useState(false)
  const [taskToUpdate,setTaskToUpdate] = useState();
  const [index, setIndex] = useState();

  const handleChange = () => {
    setTask([...task, inputValue]);
    setInputValue('');  
  }

  const setNewData = (receivedData, receivedVisibility, index) => {
    setShowModal(receivedVisibility);
    const updatedTasks = task.map((taskItem, i) => (i === index ? receivedData : taskItem));
    setTask(updatedTasks);
};

  const handleUpdate = (i,item) =>{
    setShowModal(true)
    setTaskToUpdate(item)
    setIndex(i)
  }

  const handleDelete = (index) =>{
    const removedTask = task.filter((item,i)=> i !== index)
    setTask(removedTask)
    console.log(index)
  }

  const handleVisibility = (data) =>{
    setShowModal(data);
  }

  return (
    <>
      <div className="w-full border flex-col flex justify-center items-center ">
        <div className='w-8/12'>
          <h1>TODO APPLICATION</h1>
          <Search
            placeholder="Enter you task"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onSearch={handleChange}
            enterButton="Search"
            size="large"
          />
        </div>
        <div className='w-8/12 '>
          {task.length > 0 && (
            <div className='shadow-lg rounded p-5'>
              <Divider orientation="left" >Your Tasks</Divider>
              <List
                size="large"
                bordered
                dataSource={task}
                renderItem={(item,index) => (
                  <div className='flex w-full justify-between items-center p-3'>  
                    <List.Item.Meta title={`Task#${index+1}`} description={item}/>
                    <List.Item actions={[
                      <Button danger key={'delete-key'} onClick={()=>handleDelete(index)}>Delete</Button>,
                      <Button key={'update-key'} type='primary' onClick={()=>handleUpdate(index,item)}>Update</Button>
                    ]}></List.Item>
                  </div>
                )}
              />
            </div>
          )}
        </div>
      </div>
      {
        showModal == true ?
      <CustomModal  setNewData={setNewData} data={taskToUpdate} index={index} visibility={handleVisibility}/> :null 
      }

    </>
  );
}

export default App;
