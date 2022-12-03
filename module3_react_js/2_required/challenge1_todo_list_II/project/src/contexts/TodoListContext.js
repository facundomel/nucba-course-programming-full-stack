import React, { createContext, useState } from "react";

export const TodoListContext = createContext();

export const TodoListProvider = ({ children }) => {
	const [list, setList] = useState([]);

	const handleAddItem = (addItem) => {
		setList([...list, addItem]);
	};

	const data = { list, setList, handleAddItem };

	return <TodoListContext.Provider value={data}>{children}</TodoListContext.Provider>;
};
