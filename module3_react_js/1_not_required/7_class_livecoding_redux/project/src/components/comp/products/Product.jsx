import { productData } from "../../../data/data";
import { useDispatch } from "react-redux";
import { TYPES } from "../../redux/action-type/ActionType";
import { ProductsContainerStyled, ProductStyled, ButtonStyled, ImgStyled, PStyled } from "./ProductStyles";

const Products = () => {
	const dispatch = useDispatch();

	return (
		<ProductsContainerStyled>
			{productData.map((product, i) => (
				<ProductStyled key={i}>
					<ImgStyled src={product.img} alt={product.name} />
					<div>
						<PStyled>
							{product.name} - ${product.price}
						</PStyled>
					</div>

					<ButtonStyled onClick={() => dispatch({ type: TYPES.ADD_PRODUCT, product: product })}>Add to Cart</ButtonStyled>
				</ProductStyled>
			))}
		</ProductsContainerStyled>
	);
};

export default Products;
