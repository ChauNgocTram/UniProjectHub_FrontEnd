import React from "react";
import { Tag } from 'antd';

const TaskStatusBadge = ({ taskStatus }) => {

    switch (taskStatus) {
      case 0:
        return (
          <Tag color="orange" >PENDING</Tag>
        );
      case 1:
        return (
          <Tag  color="processing">PROCESSING</Tag>
        );
      case 2:
        return (
           <Tag color="green" >COMPLETE</Tag>
        );
      case 3:
        return (
          <Tag color="magenta">TO DO</Tag>
        );
      default:
        return null;
    }
  };
  
  export default TaskStatusBadge;