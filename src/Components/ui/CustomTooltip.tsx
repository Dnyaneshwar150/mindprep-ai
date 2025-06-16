import React from "react";
import { Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "var(--light-black)",
    borderRadius: "16px",
    fontSize: "0.5rem", 
    fontFamily: "Poppins, sans-serif",
    padding: "4px 8px",
  },
}));

export default CustomTooltip;
