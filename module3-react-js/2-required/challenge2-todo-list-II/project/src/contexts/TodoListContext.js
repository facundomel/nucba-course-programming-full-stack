import React, { createContext, useEffect, useRef, useState } from "react";
import LocalStorage from "../repository/LocalStorage";

export const TodoListContext = createContext();

export const TodoListProvider = ({ children }) => {
	const keyLocalStorage = "tasks";
	const refInputTask = useRef(null);
	const [list, setList] = useState([]);

	useEffect(() => {
		setList(LocalStorage.get(keyLocalStorage) || []);
	}, []);

	const handleAddItem = (addItem) => {
		setList([...list, addItem]);
	};

	const handleFocusInputTask = () => {
		refInputTask.current.focus();
	};

	const data = { list, setList, handleAddItem, refInputTask, handleFocusInputTask };

	return <TodoListContext.Provider value={data}>{children}</TodoListContext.Provider>;
};
