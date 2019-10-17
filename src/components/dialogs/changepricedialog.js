import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ChangePriceDialog = (props) => {
  return (
    <Dialog open={props.openModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Price Change</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Change the price of the food in below given field.
          </DialogContentText>

        <input type="number" min="0" ref={props.newPriceInput} className="change-price-input" pattern="\d+" step="1" placeholder="Enter Amount" autoFocus />

      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => props.closeModal(props.modalName)}>
          Cancel
          </Button>
        <Button color="primary" onClick={props.changePrice}>
          Change
          </Button>
      </DialogActions>
    </Dialog>

  )
}
export default ChangePriceDialog