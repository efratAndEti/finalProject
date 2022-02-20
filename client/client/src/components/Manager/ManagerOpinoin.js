import { Card, CardHeader, Divider, Grid, IconButton, Rating, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, textAlign } from "@mui/system";
import { useEffect, useState } from "react";

const [opinions,setOpinions]=useState([]);
useEffect(() => {
    axios.get(`http://localhost:8080/getReportOpinions`).then((res) => {
      console.log(res.data);
      setOpinions(res.data);
    })
  }, [])


  useEffect(() => {
    const arr = opinions.map(o => { return { empId: o.emp_id, url: "", title: o.first_name + ' ' + o.last_name, width: '25%', var: o.avg, canResponse: o.canResponse } })
    console.log("avg images: ", arr);
    setImages(arr);
  }, [opinions])


const ManagerOpinion = () => {
    return (
        <>
        <Grid container spacing={3} columns={9}>
            <Grid item sx={3}>
                <Card style={{width:'32vw',textAlign:'center'}}>
                    <CardHeader
                        title="חוות דעת על ויני"
                    />
                    <Divider>מיכאל לוי</Divider>
                    <Box sx={{ p: 2 }}>
                        <div><Rating name="read-only" precision={0.5} value={0.5} readOnly /></div>
                        <p>היה שירות ממש על הפנים</p>
                        <Tooltip title=" מחק חוות דעת" arrow>
                            <IconButton onClick={(e) => { alert("כאן נמחק החות דעת ונשלח להודע לעובד ולמעביד שנמחק") }}>
                                <DeleteIcon color="action" />
                            </IconButton >
                        </Tooltip>
                    </Box>
                </Card>
            </Grid>
            <Grid item sx={3}>
                <Card style={{width:'32vw',textAlign:'center'}}>
                    <CardHeader
                        title="חוות דעת על סנטוש"
                    />
                    <Divider>מיכל שחורי</Divider>
                    <Box sx={{ p: 2 }}>
                        <div><Rating name="read-only" precision={0.5} value={1} readOnly /></div>
                        <p>יחס מזלזל</p>
                        <Tooltip title=" מחק חוות דעת" arrow>
                            <IconButton onClick={(e) => { alert("כאן נמחק החות דעת ונשלח להודע לעובד ולמעביד שנמחק") }}>
                                <DeleteIcon color="action" />
                            </IconButton >
                        </Tooltip>
                    </Box>
                </Card>
            </Grid>
            <Grid item sx={3}>
                <Card style={{width:'32vw' ,textAlign:'center'}}>
                    <CardHeader
                        title="חוות דעת על אדוריה"
                    />
                    <Divider>יהודה אליהו</Divider>
                    <Box sx={{ p: 2 }}>
                        <div><Rating name="read-only" precision={0.5} value={0} readOnly /></div>
                        <p>גנבה חצי בית</p>
                        <Tooltip title=" מחק חוות דעת" arrow>
                            <IconButton onClick={(e) => { alert("כאן נמחק החות דעת ונשלח להודע לעובד ולמעביד שנמחק") }}>
                                <DeleteIcon color="action" />
                            </IconButton >
                        </Tooltip>
                    </Box>
                </Card>
            </Grid>

        </Grid>
        </>
    );
}

export default ManagerOpinion