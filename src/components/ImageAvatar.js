import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  large: {
    width: theme.spacing(26),
    height: theme.spacing(26),
  },
}));

export default function ImageAvatars({ imageURL, name }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Avatar
        alt={name}
        src={imageURL}
        className={classes.large + ' middle shadow'}
      />
    </div>
  );
}
