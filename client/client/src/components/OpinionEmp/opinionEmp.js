import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { ButtonBase, Divider, Rating, Typography } from '@mui/material';
import axios from 'axios';



const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 460,
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
function generateRandomColor() {
  var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  return randomColor;
  //random color will be freshly served
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const OpinionEmp = () => {

  const [opinions, setOpinions] = useState([]);
  const [emp, setEmp] = useState(null);
  const [avg, setAvg] = useState(0);

  useEffect(() => {
    const empStr = localStorage.getItem("employee");
    const employee = JSON.parse(empStr);
    setEmp(employee);

    axios.get(`http://localhost:8080/getOpinionById/${employee.emp_id}`).then((res) => {
      console.log(res.data);
      setOpinions(res.data);
    })
  }, [])

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < opinions.length; i++)
      sum += opinions[i].rank;
    const myAvg = sum / opinions.length;
    setAvg(myAvg);

  }, [opinions])


  return (
    <Grid container spacing={2} columns={16}>
      {emp == null ? <div>טוען</div> :
        <>
          <Grid item xs={8}>
            <ImageButton
              // onClick={handleClickOpen}
              focusRipple
              key={emp.emp_id}
              style={{
                width: '100%',
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

                  {emp.first_name + ' ' + emp.last_name}
                  <br />
                  <Rating name="read-only" precision={0.5} value={avg} readOnly />

                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>

              </Image>



            </ImageButton>
          </Grid>
          <Grid item xs={8}>
            <Typography >
              <h3>here need to be all the opinion</h3>


              {opinions.map(o => <>
                <Divider>{o.first_name + ' ' + o.last_name}</Divider>
                <div><Rating name="read-only" precision={0.5} value={o.rank} readOnly /></div>
                <p>{o.description}</p>
              </>)}

            </Typography>
          </Grid>
        </>
      }
    </Grid>
  );
}
export default OpinionEmp