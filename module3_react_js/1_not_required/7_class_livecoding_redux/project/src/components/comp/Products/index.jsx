import { productData } from "../../../data/data";
import styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { TYPES } from "../../redux/action-type/ActionType";

const Products = () => {
	const dispatch = useDispatch();

	return (
		<div className={styles.productsContainer}>
			{productData.map((product, i) => (
				<div key={i} className={styles.product}>
					<img src={product.img} alt={product.name} />
					<div>
						<p>
							{product.name} - ${product.price}
						</p>
					</div>

					<button onClick={() => dispatch({ type: TYPES.ADD_PRODUCT, product: product })}>Add to Cart</button>
				</div>
			))}
		</div>
	);
};

export default Products;
