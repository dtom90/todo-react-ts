import React from 'react';
import { useClientStore } from '../hooks/useClientStore';

const TaskFilter: React.FC = () => {
  const { filter, setFilter } = useClientStore();

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
