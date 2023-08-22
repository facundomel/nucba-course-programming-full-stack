import { productData } from "../../../data/data";
import { useDispatch } from "react-redux";
import { actionAddProduct } from "../../redux/actions/Actions";
import { ProductsContainerStyled, ProductStyled, ButtonStyled, ImgStyled, NameAndPriceStyled } from "./ProductStyles";

const Products = () => {
	const dispatch = useDispatch();

	return (
		<ProductsContainerStyled>
			{productData.map((product, i) => (
				<ProductStyled key={i}>
					<ImgStyled src={product.img} alt={product.name} />
					<div>
						<NameAndPriceStyled>
							{product.name} - ${product.price}
						</NameAndPriceStyled>
					</div>

					<ButtonStyled onClick={() => dispatch(actionAddProduct(product))}>AGREGAR</ButtonStyled>
				</ProductStyled>
			))}
		</ProductsContainerStyled>
	);
};

export default Products;
