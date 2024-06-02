import React, { useState } from "react";
import Select from "react-select";

function UserList() {
  const [value, setValue] = useState(null);
  const options = [
    { value: "CHOCOLATE", label: "Chocolate" },
    { value: "CANDY", label: "Candy" },
    { value: "ICE CREAM", label: "Ice Cream" },
    { value: "BURGER", label: "Burger" },
  ];

  return (
    <div className=" ">
        <p className='text-gray-700 mb-1'>Người phụ trách: </p>
      <Select
        options={options}
        defaultValue={value}
        placeholder="Chọn thành viên"
        onChange={setValue}
        isMulti
        isSearchable
        noOptionsMessage={() => "Không tìm thấy thành viên"}
        styles={{
          placeholder: (baseStyles, state) => ({
            ...baseStyles,
            color: "gray",
          }),
          clearIndicator: (baseStyles) => ({
            ...baseStyles,
            color: "red",
          }),
          dropdownIndicator: (baseStyles) => ({
            ...baseStyles,
            color: "black",
          }),
          control: (baseStyles) => ({
            ...baseStyles,
            color: "red",
          }),
          multiValueRemove: (baseStyles, state) => ({
            ...baseStyles,
            color: state.isFocused ? "red" : "gray",
            backgroundColor: state.isFocused ? "black" : "lightblue",
          }),
        }}
      />
    </div>
  );
}

export default UserList;
