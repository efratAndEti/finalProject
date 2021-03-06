import { Button, Card, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, Rating, Slide, TextField, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, textAlign } from "@mui/system";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ManagerOpinion = () => {
    const [opinions, setOpinions] = useState([]);
    const [reports, setReports] = useState([]);
    const [reason, setReason] = useState('');
    const [id, setId] = useState();

    useEffect(() => {
        axios.get(`http://localhost:8080/getReportOpinions`).then((res) => {
            console.log(res.data);
            setOpinions(res.data);
        })
    }, [])


    useEffect(() => {
        const arr = opinions.map(o => { return { id: o.idOpinion, client_name: o.c_first + ' ' + o.c_last, emp_name: o.first_name + ' ' + o.last_name, rate: o.rank, desc: o.description } })
        console.log("avg images: ", arr);
        setReports(arr);
    }, [opinions])

    const deleteOpinion = () => {
        axios.delete(`http://localhost:8080/deleteOpinion/${id}`).then((res) => {
            console.log(res);
        })

        alert("send massage");
    }
    const changeReport = () => {
        axios.put(`http://localhost:8080/changeReport/${id}`).then((res) => {
            console.log(res);
        })

        alert("send massage");
    }
    const [open, setOpen] = useState(false);

    const handleClickOpen = (e) => {
        console.log(e);
        setId(e);
        setOpen(true);
    };

    const handleClose = () => {
        changeReport();
        setOpen(false);
    };
    
    const handleChange = () => {
        deleteOpinion();
        setOpen(false);
    };
    return (
        <>
            <Grid container spacing={3} columns={9}>
                {reports.map((report) => (
                    <Grid item sx={3}>
                        <Card style={{ width: '32vw', textAlign: 'center' }}>
                            <CardHeader
                                title={report.emp_name}
                            />
                            <Divider>{report.client_name}</Divider>
                            <Box sx={{ p: 2 }}>
                                <div><Rating name="read-only" precision={0.5} value={report.rate} readOnly /></div>
                                <p>{report.desc}</p>
                                <Tooltip title=" ?????? ???????? ??????" arrow>
                                    <IconButton onClick={(e) => { handleClickOpen(report.id) }}>
                                        <DeleteIcon color="action" />
                                    </IconButton >
                                </Tooltip>
                            </Box>
                        </Card>
                    </Grid>
                ))
                }
            </Grid>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"?????????? ???????? ??????"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        ?????? ?????? ???????? ???????????? ???????? ?????????  ?
                    </DialogContentText>
                    <TextField id="standard-basic" value={reason} onChange={(e) => { setReason(e.target.value9) }} label="??????????" variant="standard" helperText="?????????? ???????? ?????????? ????????????" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>?????? ????????</Button>
                    <Button onClick={handleChange}>??????</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ManagerOpinion