import React, { createContext, useEffect, useRef, useState } from "react";
import taskService from "../service/TaskService";

export const TodoListContext = createContext();

export const TodoListProvider = ({ children }) => {
	const refInputTask = useRef(null);
	const [list, setList] = useState([]);

	useEffect(() => {
		taskService
			.getAllTasks()
			.then((data) => {
				setList(data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handlerAddItem = (addItem) => {
		setList([...list, addItem]);
	};

	const handlerFocusInputTask = () => {
		refInputTask.current.focus();
	};

	const data = { list, setList, handlerAddItem, refInputTask, handlerFocusInputTask };

	return <TodoListContext.Provider value={data}>{children}</TodoListContext.Provider>;
};
