export const formatDate = (date) => {
    const month = date.toLocaleString("en-US", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
  
    const formattedDate = `${day}-${month}-${year}`;
  
    return formattedDate;
  };
  
  export function dateFormatter(dateString) {
    const inputDate = new Date(dateString);
  
    if (isNaN(inputDate)) {
      return "Invalid Date";
    }
  
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, "0");
    const day = String(inputDate.getDate()).padStart(2, "0");
  
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  
  export function getInitials(fullName) {
    const names = fullName.split(" ");
  
    const initials = names.slice(0, 2).map((name) => {
      if (name && name.length > 0) {
        return name[0].toUpperCase();
      }
      return '';
    });
  
    const initialsStr = initials.join("");
  
    return initialsStr;
  };


  
  export const PRIOTITYSTYELS = {
    3: "text-red-600",
    2: "text-yellow-600",
    1: "text-blue-600",
  };
  
  // export const TASK_TYPE = {
  //   1: "bg-blue-600",
  //   2: "bg-yellow-600",
  //   3: "bg-green-600",
  // };
  
  export const BGS = [
    "bg-blue-600",
    "bg-yellow-600",
    "bg-red-600",
    "bg-green-600",
  ];
  
  export const BG_TASK_CARD = {
    todo: "bg-toDo",
    inProgress: "bg-inProgress",
    completed: "bg-completed",
    pending:"bg-pending"
  };
  