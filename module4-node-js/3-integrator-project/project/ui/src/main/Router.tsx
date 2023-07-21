import { Route, Routes } from "react-router-dom";
import Home from "../components/pages/home/Home";
import MyRecipes from "../components/pages/my-recipes/MyRecipes";
import Login from "../components/pages/user/login/Login";
import { useSelector } from "react-redux";
import Register from "../components/pages/user/register/Register";
import ForgotPassword from "../components/pages/user/forgot-password/ForgotPassword";
import PageNotFound from "../components/pages/page-not-found/PageNotFound";

const Router = () => {
	const { currentUser } = useSelector((state) => (state as any).user);

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			{currentUser && <Route path="mis-recetas" element={<MyRecipes />} />}
			<Route path="registro" element={<Register />} />
			<Route path="login" element={<Login />} />
			<Route path="recuperar-password" element={<ForgotPassword />} />
			<Route path="*" element={<PageNotFound />} />
		</Routes>
	);
};

export default Router;
