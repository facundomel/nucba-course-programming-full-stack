import React, { createContext, useEffect, useRef, useState } from "react";
import LocalStorage from "../repository/LocalStorage";

export const TodoListContext = createContext();

export const TodoListProvider = ({ children }) => {
	const keyLocalStorage = "tasks";
	const [list, setList] = useState([]);
	const refInputTask = useRef(null);

	useEffect(() => {
		setList(LocalStorage.get(keyLocalStorage) || []);
	}, []);

	const handleAddItem = (addItem) => {
		setList([...list, addItem]);
	};

	const handleFocusInputTask = () => {
		refInputTask.current.focus();
	};

	const data = { list, setList, refInputTask, handleAddItem, handleFocusInputTask };

	return <TodoListContext.Provider value={data}>{children}</TodoListContext.Provider>;
};
