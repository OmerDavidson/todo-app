import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import CheckBox from '@material-ui/icons/CheckBox';
import IconButton from '@material-ui/core/IconButton';

const SingleTask = ({ task, onDelete, onChecked, status }) => {
  return (
    <div>
      <Typography>{task}</Typography>
      <CheckBox checked={status} onChange={onChecked} />
      <IconButton onClick={onDelete} color="secondary">
        <CloseIcon />
      </IconButton>
    </div>
  );
};

export default SingleTask;
