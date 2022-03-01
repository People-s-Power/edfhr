import { useMutation } from "@apollo/client";
import { UPDATE_APPLICANT_PAYMENT } from "apollo/queries/applicantQuery";
import { UserAtom } from "atom/UserAtom";
import { ObjectId } from "mongoose";
import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import { useRecoilValue } from "recoil";
import { Modal } from "rsuite";

interface IPage {
	applicant: ObjectId;
	show: boolean;
	onHide(): void;
}

const ApplicantPayment = ({ show, onHide, applicant }: IPage): JSX.Element => {
	const user = useRecoilValue(UserAtom);
	const [amount, setAmount] = useState(0);
	const [updatePayment] = useMutation(UPDATE_APPLICANT_PAYMENT);
	const paystack_config = {
		reference: new Date().getTime().toString(),
		email: user?.email,
		amount: amount * 100,
		publicKey: process.env.PAYSTACK_SECRET,
		// || "pk_test_4611aa9c08b8fc8025407dbfae5253d0e5796383",
	};
	// const initializePayment = usePaystackPayment(paystack_config);

	const onSuccess = async (res) => {
		if (res.status === "success") {
			const { data } = await updatePayment({
				variables: {
					amount_paid: paystack_config.amount,
					applicant: applicant,
				},
			});
			onHide();
			console.log(data);
		}
	};

	const onClose = () => {
		console.log("closed");
	};
	const componentProps = {
		...paystack_config,
		text: "Pay now",
		onSuccess,
		onClose,
	};

	return (
		<Modal show={show} onHide={onHide} size="sm">
			<Modal.Body>
				<form>
					<div className="form-group">
						<input
							type="number"
							placeholder="Amount"
							className="form-control"
							onChange={(e) => setAmount(Number(e.target.value))}
						/>
					</div>
				</form>
			</Modal.Body>
			<Modal.Footer>
				{/* <button
          className="btn btn-info"
          disabled={amount <= 200}
          onClick={handlePay}
        >
          Initialize Payment
        </button> */}
				<PaystackButton {...componentProps} className="btn btn-info" />
			</Modal.Footer>
		</Modal>
	);
};

export default ApplicantPayment;

// ApplicantPayment.propTypes = {
//   show: PropTypes.bool,
//   onHide: PropTypes.func,
//   applicant: PropTypes.string,
// };
