import http from "http";
import { Router } from "./router/Router";

const app = http.createServer(Router.init);

app.listen(3002, () => {
	console.log("🗲 Server running on port 3002 🗲");
});
