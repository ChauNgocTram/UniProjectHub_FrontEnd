import React, { useState }  from 'react';
import { format } from 'date-fns';

const FormattedDate = ({ date, dateFormat = 'dd-MM-yyyy' }) => {
  if (!date) return <span>N/A</span>;

  const formattedDate = format(new Date(date), dateFormat);
  return <span>{formattedDate}</span>;
};

export default FormattedDate;
