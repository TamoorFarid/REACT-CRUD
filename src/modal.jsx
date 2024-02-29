/* eslint-disable react/prop-types */
import { Modal } from 'antd';
import { Input } from 'antd';
import { useEffect} from 'react';
function CustomModal(props){

useEffect(()=>{
    document.getElementById('update-input').value = props.data;
    console.log(props)
},[])

    let data;
    const handleOK = () => {
        data = document.getElementById('update-input').value;
        props.setNewData(data, false,props.index);
      };

    const handleCancel = () =>{
        props.visibility(false)
    }
    return(
        <>
            <Modal
            title="Update Task"
            open={true}
            onOk={handleOK}
            onCancel={handleCancel}
          >
              <Input size="large" id='update-input' autoComplete='off' placeholder="large size" defaultValue={props.data}/>
          </Modal>
        </>
    )
}

export default CustomModal;