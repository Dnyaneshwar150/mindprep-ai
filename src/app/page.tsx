import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

export default function Home() {
  return (
    <div>
      <Grid container sx={{gap:""}}>
              <Button variant="contained">this is mui button</Button>
        <Grid sx={{border:"1px solid black"}}>this is mui grid</Grid>
      </Grid>
  
    </div>
  );
}
