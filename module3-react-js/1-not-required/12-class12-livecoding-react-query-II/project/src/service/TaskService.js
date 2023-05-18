import axios from "axios";

export default new (class TaskService {
	async getAllTasks() {
		try {
			const result = await axios.get(`http://localhost:3006/tasks`);
			return result.data;
		} catch (error) {
			throw error;
		}
	}

	async saveTask(task) {
		return axios.post(`http://localhost:3006/tasks`, task);
	}

	async deleteTaskById(taskId) {
		return axios.delete(`http://localhost:3006/tasks/${taskId}`);
	}
})();
