import { ComponentType } from '@/types';
import { Grid } from '@mui/material'
import React from 'react'
import { ExpandMore, ExpandLess, Visibility, VisibilityOff } from '@mui/icons-material';


function PannelComponent() {
  const LEGENDS = [
  {
    title: "Question",
    type: ComponentType.Question,
    backgroundColor: "var(--background-red)",
    borderColor: "var(--border-red)",
  },
  {
    title: "Answer",
    type: ComponentType.Answer,
    backgroundColor: "var(--background-green)",
    borderColor: "var(--border-green)",
  },
  {
    title: "Main Point Heading",
    type: ComponentType.MainPointHeading,
    backgroundColor: "var(--background-orange)",
    borderColor: "var(--border-orange)",
  },
  {
    title: "Main Point Explanation",
    type: ComponentType.MainPoint,
    backgroundColor: "var(--background-blue)",
    borderColor: "var(--border-blue)",
  },
  {
    title: "SubPoint Heading",
    type: ComponentType.SubPoint,
    backgroundColor: "var(--background-grey)",
    borderColor: "var(--border-grey)",
  },
  {
    title: "SubPoint Explanation",
    type: ComponentType.Explanation,
    backgroundColor: "var(--explantion-background)",
    borderColor: "#ccc",
  },
];

const ICON_LEGENDS = [
  {
    icon: <ExpandMore sx={{fontSize:"16px"}} />,
    title: 'Expand Node',
    backgroundColor: 'var(--white)',
    borderColor: 'var(--primary-grey)',
  },
  {
    icon: <ExpandLess sx={{fontSize:"16px"}} />,
    title: 'Collapse Node',
    backgroundColor: 'var(--white)',
    borderColor: 'var(--primary-grey)',
  },
  {
    icon: <Visibility  sx={{fontSize:"10px"}} />,
    title: 'Show Children',
   backgroundColor: 'var(--white)',
    borderColor: 'var(--primary-grey)',
  },
  {
    icon: <VisibilityOff  sx={{fontSize:"10px"}}/>,
    title: 'Hide Children',
   backgroundColor: 'var(--white)',
    borderColor: 'var(--primary-grey)',
  },
];
  return (
    <Grid container flexDirection={'column'} gap={'4px'}>
      {LEGENDS.map((item) => (
        <Legend key={item.type} backgroundColor={item.backgroundColor} bordercolor={item.borderColor} 
        title={item.title}/>
      ))}
 {ICON_LEGENDS.map(({ icon, title, backgroundColor, borderColor }) => (
    <Grid container alignItems="center" gap={"16px"} key={title}>
      <Grid
        sx={{
          backgroundColor,
          border: `1px solid ${borderColor}`,
          borderRadius: "16px",
          width: "16px",
          height: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Grid>
      <Grid fontSize="8px">
        {title}
      </Grid>
    </Grid>
  ))}
      
    </Grid>
  )
}

const Legend:React.FC<{
  backgroundColor:string;
  bordercolor:string;
  title:string;
}> =({backgroundColor,bordercolor,title}) => {
  return(
    <Grid container gap={"16px"}>
   <Grid sx={{backgroundColor:`${backgroundColor}`,   border:`1px solid ${bordercolor}` , borderRadius:"16px" , width:"16px"}}
        ></Grid>
        <Grid fontSize={"8px"}>{title}</Grid>
    </Grid>
      
  )
}

export default PannelComponent