import React from 'react';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import './CardTitle.css';

function CardTitle(props) {
  return (
    <div className="card-title">
      <Button onClick={props.delete} type="button">
        <DeleteIcon />
      </Button>
      <Button type="button" onClick={props.edit}>
        <EditIcon />
      </Button>
      <h2>{props.title}</h2>
    </div>
  );
}

export default CardTitle;
