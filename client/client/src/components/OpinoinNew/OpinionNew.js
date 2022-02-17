import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import img from '../../pictures/1.jpg'
import Add from './Add';
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Fab, Grid, IconButton, Rating, TextField, Toolbar } from '@mui/material';
import HoverRating from './Rate';
import CloseIcon from '@mui/icons-material/Close';
import { typography } from '@mui/system';
import axios from 'axios';





// const images = [
//   {
//     url: '../../pictures/1.jpg',
//     title: 'עובד 1',
//     width: '20%',
//     var: '4',
//   },
//   {
//     url: '/static/images/buttons/burgers.jpg',
//     title: 'Worker B',
//     width: '20%',
//     var: '3.5',
//   },
//   {
//     url: '/static/images/buttons/camera.jpg',
//     title: 'Camera',
//     width: '20%',
//     var: '5',
//   },
//   {
//     url: '/static/images/buttons/camera.jpg',
//     title: 'Camera',
//     width: '20%',
//     var: '1.5',
//   },
//   {
//     url: '/static/images/buttons/camera.jpg',
//     title: 'Camera',
//     width: '20%',
//     var: '1.5',
//   },
// ];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function OpinionNew() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [empName, setEmpName] = React.useState('');

  const [images, setImages] = useState([]);
  const [opinions, setOpinions] = useState([]);
  const [client, setClient] = useState(null);

  const [empOpinions, setEmpOpinions] = useState([]);
  const [empId, setEmpId] = useState(null);
  const [canResopnse, setCanResponse] = useState(false);



  useEffect(() => {
    const clientStr = localStorage.getItem("client");
    const clientObj = JSON.parse(clientStr);
    setClient(clientObj);
    console.log(clientObj);
    axios.get(`http://localhost:8080/getAvgOpinions/${clientObj.id_client}`).then((res) => {
      console.log("avg opinions ", res.data);
      setOpinions(res.data);
    })
  }, [])


  useEffect(() => {
    const arr = opinions.map(o => { return { empId: o.emp_id, url: "", title: o.first_name + ' ' + o.last_name, width: '25%', var: o.avg, canResponse: o.canResponse } })
    console.log("avg images: ", arr);
    setImages(arr);
  }, [opinions])


  const handleClickOpen = (e, empId, can) => {
    
    setEmpId(empId);
    setCanResponse(can);

    axios.get(`http://localhost:8080/getOpinionById/${empId}`).then((res) => {
      console.log(res.data);
      setEmpOpinions(res.data);
    })

    setOpen(true);
    setEmpName(e.target.innerText)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addOpinionToGui = (o) => {
    const arr = [...empOpinions];
    arr.push({
      idOpinion: 0, clientId: o.client, empId: o.emp, rank: o.rank, description: o.desc,
      first_name: client.first_name,
      last_name: client.last_name
    })
    setEmpOpinions(arr);
  }


  // const newOpinion=()=>{
  //     alert('openDialog');
  //     return(
  //     <Dialog open={open} onClose={handleClose}>
  //     <DialogTitle>Add Opinion</DialogTitle>
  //     <DialogContent>
  //       <DialogContentText>
  //         Rate <HoverRating/>
  //       </DialogContentText>
  //       <TextField
  //         autoFocus
  //         margin="dense"
  //         id="name"
  //         label="tell us more"
  //         type="text"
  //         fullWidth
  //         variant="standard"
  //         multiline="true"
  //         required="true"
  //         value={value}
  //         onChange={handleChange}

  //       />
  //     </DialogContent>
  //     <DialogActions>
  //       <Button onClick={handleClose}>Cancel</Button>
  //       <Button disabled={disabled} onClick={handleCloseAdd}>Add</Button>
  //     </DialogActions>
  //   </Dialog>);
  // }
  function generateRandomColor() {
    var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
    //random color will be freshly served
  }

  return (

    <>

      {client == null ? <div>טוען</div> :

        <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
          {images.map((image) => (
            <ImageButton
              onClick={(e) => { handleClickOpen(e, image.empId, image.canResponse) }}
              focusRipple
              key={image.title}
              style={{
                width: image.width,
              }}
            >
              <ImageSrc style={{
                //   backgroundImage: `url(${image.url})`
                backgroundColor: `${generateRandomColor()}`
              }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  sx={{
                    position: 'relative',
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  }}
                >

                  {image.title}
                  <br />
                  <Rating name="read-only" precision={0.5} value={image.var} readOnly />

                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>

              </Image>



            </ImageButton>
          ))
          }
          <Dialog open={open} onClose={handleClose}>
            <AppBar sx={{ position: 'relative' }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                  {empName} Opinoin
                </Typography>
              </Toolbar>
            </AppBar>

            {/* <DialogTitle>opinion</DialogTitle> */}
            <DialogContent>
              <DialogContentText>

              </DialogContentText>
              <Typography >
                here nedd to be all the last opinion

                {empOpinions.map(o => <>
                  <Divider>{o.first_name + ' ' + o.last_name}</Divider>
                  <div><Rating name="read-only" precision={0.5} value={o.rank} readOnly /></div>
                  <p>{o.description}</p>
                </>)}
              </Typography>
            </DialogContent>
            <DialogActions>
              {/* <Button onClick={handleClose}>Cancel</Button> */}
              <Grid xs={11} align="right">
            { canResopnse == false?<></> :  <Fab color="primary" aria-label="add"><Add clientId={client.id_client} empId={empId} addOpinionToGui={addOpinionToGui} canResponse={ canResopnse} /></Fab>}
              </Grid>
            </DialogActions>
          </Dialog>
        </Box>

      }
    </>

  );
}