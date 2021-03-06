import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { ButtonBase, Divider, Rating, Typography } from '@mui/material';
import axios from 'axios';
import ManagerOpinion from '../Manager/ManagerOpinoin';
import { Route, Routes } from 'react-router';


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

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const ManagerPage = () => {

    return (
        <>
            <Grid container spacing={2} columns={9}>

                <Grid item xs={3}>
                    <ImageButton onClick={(e) => { window.location.assign(`/manager-bar/opinion`) }}focusRipple key={1} style={{ width: '100%',height:'45vh' }}>
                        <ImageSrc style={{ backgroundColor: `${'#00acc1'}` }} />
                        <ImageBackdrop className="MuiImageBackdrop-root" />
                        <Image>
                            <Typography component="span" variant="subtitle1" color="inherit" sx={{ position: 'relative', p: 4, pt: 2, pb: (theme) => `calc(${theme.spacing(1)} + 6px)`, }} >
                                ???????????? ???? ???????? ??????
                                <br />
                                <ImageMarked className="MuiImageMarked-root" />
                            </Typography>
                        </Image>
                    </ImageButton>
                </Grid>

                <Grid item xs={3}>
                    <ImageButton onClick={(e) => { window.location.assign(`/manager-bar/employee-view`) }} focusRipple key={1} style={{ width: '100%',height:'45vh'}}>
                        <ImageSrc style={{ backgroundColor: `${'#006064'}` }} />
                        <ImageBackdrop className="MuiImageBackdrop-root" />
                        <Image>
                            <Typography component="span" variant="subtitle1" color="inherit" sx={{ position: 'relative', p: 4, pt: 2, pb: (theme) => `calc(${theme.spacing(1)} + 6px)`, }} >
                                ?????????? ?????????? ????????????
                                <br />
                                <ImageMarked className="MuiImageMarked-root" />
                            </Typography>
                        </Image>
                    </ImageButton>
                </Grid>
                <Grid item xs={3}>
                    <ImageButton onClick={(e) => { window.location.assign(`/manager-bar/client-view`) }}focusRipple key={1} style={{ width: '100%',height:'45vh' }}>
                        <ImageSrc style={{ backgroundColor: `${'#00838f'}` }} />
                        <ImageBackdrop className="MuiImageBackdrop-root" />
                        <Image>
                            <Typography component="span" variant="subtitle1" color="inherit" sx={{ position: 'relative', p: 4, pt: 2, pb: (theme) => `calc(${theme.spacing(1)} + 6px)`, }} >
                                ?????????? ?????????? ????????????
                                <br />
                                <ImageMarked className="MuiImageMarked-root" />
                            </Typography>
                        </Image>
                    </ImageButton>
                </Grid>
            </Grid>
            <br />  
            <Grid container spacing={2} columns={9}>

                <Grid item xs={6}>
                    <ImageButton  onClick={(e) => { window.location.assign(`/manager-bar/statistics`) }} focusRipple key={1} style={{ width: '100%',height:'40vh' }}>
                        <ImageSrc style={{ backgroundColor: `${'#80deea'}` }} />
                        <ImageBackdrop className="MuiImageBackdrop-root" />
                        <Image>
                            <Typography component="span" variant="subtitle1" color="inherit" sx={{ position: 'relative', p: 4, pt: 2, pb: (theme) => `calc(${theme.spacing(1)} + 6px)`, }} >
                                ????????????????????
                                <br />
                                <ImageMarked className="MuiImageMarked-root" />
                            </Typography>
                        </Image>
                    </ImageButton>
                </Grid>
                <Grid item xs={3}>
                    <ImageButton focusRipple key={1} style={{ width: '100%', height:'40vh'}}>
                        <ImageSrc style={{ backgroundColor: `${'#006064'}` }} />
                        <ImageBackdrop className="MuiImageBackdrop-root" />
                        <Image>
                            <Typography component="span" variant="subtitle1" color="inherit" sx={{ position: 'relative', p: 4, pt: 2, pb: (theme) => `calc(${theme.spacing(1)} + 6px)`, }} >
                                ???????????? ??????????                            <br />
                                <ImageMarked className="MuiImageMarked-root" />
                            </Typography>
                        </Image>
                    </ImageButton>
                </Grid>
            </Grid>
            {/* <Routes>
                  <Route path={`opinion`} element={<ManagerOpinion />} />
            </Routes> */}
        </>
    );
}

export default ManagerPage;