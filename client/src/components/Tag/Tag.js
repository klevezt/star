import React from 'react'
import { Chip } from "@mui/material";

const Tag = ({title}) => {
  return <Chip label={title} color="success" className='me-2' />;
}

export default Tag