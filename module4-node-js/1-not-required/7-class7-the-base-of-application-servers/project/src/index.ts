import http from "http";
import Router from "./router/Router";

const app = http.createServer(Router.init);

app.listen(8080, () => {
	console.log("🗲 Server running on port 8080 🗲");
});
