import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const addItemDialog=(props)=>{

    return(
        <Dialog open={props.openModal}  aria-labelledby="form-dialog-title">
        
        <DialogTitle id="form-dialog-title">Add New Item</DialogTitle>
        <form onSubmit={props.addItemSubmit}>
        <DialogContent>
       
       
        <div className="food-new-item">
        <input type="text" placeholder="Enter food name" onChange={(ev)=>props.changeAddItemFormData(ev,'food_name')} value={props.formValue.food_name} required/>
        <input type="number" placeholder="Enter food price" onChange={(ev)=>props.changeAddItemFormData(ev,'food_price')} value={props.formValue.food_price} required />
        <select placeholder="Select food type" onChange={(ev)=>props.changeAddItemFormData(ev,'food_type')} value={props.formValue.food_type}  required>
          <option value="veg">VEG</option>
          <option value="non_veg">NON VEG</option>
        </select>
        <input type="url" placeholder="Enter food image url (optional)" onChange={(ev)=>props.changeAddItemFormData(ev,'food_img')} value={props.formValue.food_img} />
        </div>
       
        
        
        </DialogContent>
        <DialogActions>
          <Button  color="primary" onClick={()=>props.closeModal(props.modalName)}>
            Cancel
          </Button>
          <input type="submit" className="food-add-btn"  value="ADD"/>
            
          
        </DialogActions>
        
        </form>
      </Dialog>
   
      

    )
}
export default addItemDialog