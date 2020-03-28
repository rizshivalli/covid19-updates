import React from "react";
import { Typography, Link } from "@material-ui/core";

const CovidTypography = ({
  text,
  variant = "h1",
  isGutterBottom = false,
  style,
  color = "inherit",
  align = "center",
  to
}) => {
  return (
    <Typography
      variant={variant}
      gutterBottom={isGutterBottom}
      style={style}
      display="block"
      color={color}
      align={align}
    >
      {to ? (
        <Link href={`#/${to}`} target="_blank" rel="noopener">
          {text}
        </Link>
      ) : (
        text
      )}
    </Typography>
  );
};

export default CovidTypography;
