'use client'
import { ReactFlowProvider } from "@xyflow/react";
import Workflow from "./Workflow/Workflow";
import { Box, Button, Grid, Typography } from "@mui/material";



export default function Home() {
  
  return (
    <div>
 <ReactFlowProvider>
          <Workflow />
        </ReactFlowProvider>
          <Box sx={{ padding: 2 }}>
      
    </Box>
       
        {/* <Grid container gap={"10px"}>
           <Grid sx={{backgroundColor:"#A0C4FF",borderRadius:"16px" , border:"1px solid black",fontSize:"10px" , padding:"5px"}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quisquam reiciendis autem culpa.
        </Grid>
         <Grid sx={{backgroundColor:"#B9FBC0",borderRadius:"16px" , border:"1px solid black",fontSize:"10px" , padding:"5px"}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quisquam reiciendis autem culpa.
        </Grid>
         <Grid sx={{backgroundColor:"#FDFFB6",borderRadius:"16px" , border:"1px solid black",fontSize:"10px" , padding:"5px"}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quisquam reiciendis autem culpa.
        </Grid>
         <Grid sx={{backgroundColor:"#FFADAD",borderRadius:"16px" , border:"1px solid black",fontSize:"10px" , padding:"5px"}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quisquam reiciendis autem culpa.
        </Grid>
         <Grid sx={{backgroundColor:"#CAB8FF",borderRadius:"16px" , border:"1px solid black",fontSize:"10px" , padding:"5px"}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quisquam reiciendis autem culpa.
        </Grid>
         <Grid sx={{backgroundColor:"#CFFAFE",borderRadius:"16px" , border:"1px solid black",fontSize:"10px" , padding:"5px"}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quisquam reiciendis autem culpa.
        </Grid>

        <Grid sx={{backgroundColor:"#A9A9A9",borderRadius:"16px" , border:"1.2px solid grey",fontSize:"10px" , padding:"5px" , color:"white"}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quisquam reiciendis autem culpa.
        </Grid>
        <Grid sx={{backgroundColor:"#A9A9A9",borderRadius:"16px" , border:"1.2px solid grey",fontSize:"10px" , padding:"5px" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quisquam reiciendis autem culpa.
        </Grid>
        <Grid sx={{backgroundColor:"#3f3f3f",borderRadius:"20px" , border:"1.2px solid grey",fontSize:"10px" , padding:"5px" , color:"#FFFFFF" , fontWeight:"bold"}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quisquam reiciendis autem culpa.
        </Grid>
         <Grid sx={{backgroundColor:"#8b8b8b",borderRadius:"20px" ,fontSize:"10px" , padding:"6px" , color:"#FFFFFF" , maxWidth:"250px"}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quisquam reiciendis autem culpa.
        </Grid>
         <Grid sx={{backgroundColor:"#FFFFFF",borderRadius:"20px" ,fontSize:"10px" , border:"1.2px solid grey", padding:"6px" , color:"grey", maxWidth:"250px" ,fontWeight:"bold"}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quisquam reiciendis autem culpa.
        </Grid>
        <Grid sx={{backgroundColor:"#3f3f3f",borderRadius:"15px" , border:"1.2px solid grey",fontSize:"10px" , padding:"5px" , color:"#FFFFFF" ,}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quisquam reiciendis autem culpa.
        </Grid>
        <Grid sx={{backgroundColor:"#8b8b8b",borderRadius:"20px" ,fontSize:"10px" , padding:"6px" , color:"#FFFFFF" , maxWidth:"250px" , fontWeight:"bold"}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quisquam reiciendis autem culpa.
        </Grid>
        </Grid>

        
        <Grid sx={{backgroundColor:"#3f3f3f",borderRadius:"20px" , border:"1.2px solid grey",fontSize:"10px" , padding:"5px" , color:"#FFFFFF" , fontWeight:"bold"}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quisquam reiciendis autem culpa.
        </Grid> */}
    </div>
  );
}
