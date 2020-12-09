import React, { useRef, useEffect } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Avatar from '@material-ui/core/Avatar';
/*
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

export default function ImageAvatars({ imageURL, name, setImage }) {
  const inputFile = useRef(null);
  const [newFile, setFile] = useState(null);

  if (newFile !== null) {
    setImage(newFile);
  }
  const onchange = (e) => {
    setFile(e.target.value);
  };
  const onButtonClick = () => {
    inputFile.current.click();
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <input
        type='file'
        id='file'
        ref={inputFile}
        onChange={onchange}
        style={{ display: 'none' }}
        accept='image/png, image/jpeg'
      />
      <Avatar
        alt={name}
        src={imageURL}
        className={classes.large + ' middle shadow editIcon'}
      >
        <i
          className='material-icons pos ptcolour'
          onClick={onButtonClick}
          alt='edit'
        >
          edit
        </i>
      </Avatar>
    </div>
  );
}
*/

const ImageAvatar = ({ imageURL, name, setImage }) => {
  const inputFile = useRef(null);
  // const [newFile, setFile] = useState(null);
  // if (newFile !== null) {
  //   setImage(newFile);
  // }
  useEffect(() => {}, [imageURL]);
  const onchange = (e) => {
    //setFile(e.target.files);
    setImage(e.target.files[0]);
  };
  const onButtonClick = () => {
    inputFile.current.click();
  };
  return (
    <div className='editIcon'>
      {' '}
      <input
        type='file'
        id='file'
        ref={inputFile}
        onChange={onchange}
        style={{ display: 'none' }}
        accept='image/png, image/jpeg'
      />
      <img src={imageURL} alt='Avatar' className='middle shadow avatar'></img>
      <i
        className='material-icons pos text-primary'
        onClick={onButtonClick}
        alt='edit'
      >
        edit
      </i>
    </div>
  );
};

export default ImageAvatar;
