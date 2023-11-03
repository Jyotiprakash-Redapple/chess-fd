import React, { useState } from "react";
import {
	CContainer,
	CRow,
	CCol,
	CForm,
	CCard,
	CFormInput,
	CFormCheck,
	CFormFeedback,
	CButton,
	CFormLabel,
	CFormText,
} from "@coreui/react";
import AppButton from "../../../component/app/button/Button";
function Login() {
	const [validated, setValidated] = useState(false);
	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();

			// api call
		}
		setValidated(true);
	};
	return (
		<div className='bg-light min-vh-100 d-flex flex-row align-items-center'>
			<CContainer fluid className='login_wrapper'>
				<CRow>
					<CCol xs='12'>
						<CCard className='login_card'>
							<CForm
								className='login_form needs-validation'
								noValidate
								validated={validated}
								onSubmit={handleSubmit}>
								<CRow className='form_group'>
									<CCol xs='12'>
										<CFormLabel htmlFor='exampleFormControlInput1' className='input_label'>
											Enter Your Name
										</CFormLabel>
										<CFormInput
											className='input'
											type='text'
											feedbackValid='Looks good!'
											id='validationCustom01'
											required
											aria-describedby='exampleFormControlInputHelpInline'
										/>
									</CCol>
								</CRow>
								<CRow>
									<CCol xs='12'>
										<AppButton text={"PLAY"} />
									</CCol>
								</CRow>
							</CForm>
						</CCard>
					</CCol>
				</CRow>
			</CContainer>
		</div>
	);
}

export default Login;
