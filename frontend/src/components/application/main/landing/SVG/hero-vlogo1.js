import React from "react";
 
const SVG = ({
  fill = `${this.props.fill}`,
}) => (
  <path 
    id="path0" 
    d="
      M 20,0
      l 20,20
      l -20, 20
      l -20, -20
      z
    "
    stroke="black"
    strokeWidth=".5"
    fill={fill}
    fillRule="evenodd">
  ></path>
);

export default SVG;