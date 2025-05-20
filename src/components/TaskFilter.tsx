import React from 'react';
import { useFilter } from '../hooks/useFilter';

const TaskFilter: React.FC = () => {
  const { filter, setFilter } = useFilter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setFilter(newValue);
  };

  return (
    <div>
      <input
        type="text"
        value={filter}
        onChange={handleChange}
        placeholder="Filter tasks..."
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default TaskFilter;
