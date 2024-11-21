import React, { useState } from "react";

const FilterPanel = ({ onFilter }) => {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    onFilter({ date, category: newCategory });
  };

  // Uncomment if you decide to include the date filter later
  // const handleDateChange = (e) => {
  //   const newDate = e.target.value;
  //   setDate(newDate);
  //   onFilter({ date: newDate, category });
  // };

  return (
    <div className="filter-panel">
      <div className="d-flex gap-3">
        <label htmlFor="category-filter" className="align-item-center">
          Category:
        </label>
        <select
          id="category-filter"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="">All</option>
          <option value="technology">Technology</option>
          <option value="sports">Sports</option>
          <option value="health">Health</option>
          <option value="business">Business</option>
        </select>
      </div>
      {/* Uncomment if you include a date filter
      <div>
        <label htmlFor="date-filter">Date:</label>
        <input
          id="date-filter"
          type="date"
          value={date}
          onChange={handleDateChange}
        />
      </div>
      */}
    </div>
  );
};

export default FilterPanel;
