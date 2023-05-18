import React from "react";
import * as Yup from "yup";
import { FormBox, FormStyled, FormSubtitle, FormTitle } from "./FormStyles";
import { Formik } from "formik";
import Input from "../../shared/input/Input";
import ButtonSubmit from "../../shared/button-submit/ButtonSubmit";

export const Form = () => {
	const phoneRegex = /\d{10}$/;

	const validationSchema = Yup.object({
		name: Yup.string().trim().required("Campo requerido"),
		lastName: Yup.string().trim().required("Campo requerido"),
		email: Yup.string().email("Correo electronico no válido").required("Campo requerido"),
		phone: Yup.string().matches(phoneRegex, "Numero de celular no válido").required("Campo requerido"),
		age: Yup.number().moreThan(17, "Debe ser mayor de 17").lessThan(50, "Debe ser menor de 50").required("Campo requerido"),
		motorcycleExperience: Yup.boolean(),
	});

	return (
		<FormBox>
			<FormTitle>¡Solicitud de empleo!</FormTitle>
			<FormSubtitle>
				A continuación debés dejar los datos para la solicitud de empledo en <b>"Qué Pizzería Papá"</b>
			</FormSubtitle>
			<Formik
				initialValues={{
					name: "",
					lastName: "",
					email: "",
					phone: "",
					age: "",
					motorcycleExperience: false,
				}}
				validationSchema={validationSchema}
				onSubmit={(values, { resetForm }) => {
					console.log({ values });
					resetForm();
				}}
			>
				{({ touched, errors }) => (
					<FormStyled>
						<Input label="Nombre" name="name" type="text" isError={touched.name && errors.name} />
						<Input label="Apellido" type="text" name="lastName" isError={touched.lastName && errors.lastName} />
						<Input label="Correo Electronico" type="email" name="email" isError={touched.email && errors.email} />
						<Input label="Telefono" type="tel" name="phone" isError={touched.phone && errors.phone} />
						<Input label="Edad" type="number" name="age" isError={touched.age && errors.age} />
						<Input label="Experiencia con motos" type="checkbox" name="motorcycleExperience" />
						<ButtonSubmit />
					</FormStyled>
				)}
			</Formik>
		</FormBox>
	);
};
