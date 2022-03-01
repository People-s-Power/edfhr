import { UserAtom } from "atoms/UserAtom";
import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import { useRecoilValue } from "recoil";
import { Modal } from "rsuite";
import { IUser } from "types/Applicant.types";

interface IPage {
  applicant: string;
  show: boolean;
  onHide(): void;
}

const ApplicantPayment = ({ show, onHide, applicant }: IPage): JSX.Element => {
  const user = useRecoilValue<Partial<IUser> | null>(UserAtom);
  const [amount, setAmount] = useState(0);
  // const [updatePayment] = useMutation(UPDATE_APPLICANT_PAYMENT);
  const paystack_config = {
    reference: new Date().getTime().toString(),
    email: user?.email as string,
    amount: amount * 100,
    publicKey: process.env.REACT_APP_PAYSTACK_KEY as string,

    // || "pk_test_4611aa9c08b8fc8025407dbfae5253d0e5796383",
    // process.env.PAYSTACK_SECRET ||
  };
  //   const initializePayment = usePaystackPayment(paystack_config);

  const onSuccess = async (res: any) => {
    console.log(res, applicant);
    // if (res.status === "success") {
    //   const { data } = await updatePayment({
    //     variables: {
    //       amount_paid: paystack_config.amount,
    //       applicant: applicant,
    //     },
    //   });
    //   onHide();
    //   console.log(data);
    // }
    onHide();
  };

  const onClose = () => {
    console.log("closed");
  };
  const componentProps = {
    ...paystack_config,
    text: "Pay now",
    onSuccess: (data: any) => onSuccess(data),
    onClose,
    custom_fields: {
      name: "Ifeanyi",
    },
  };

  return (
    <Modal show={show} onHide={onHide} size="xs">
      <Modal.Body>
        <form>
          <div className="form-group">
            <input type="number" placeholder="Amount" className="form-control" onChange={(e) => setAmount(Number(e.target.value))} />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <PaystackButton {...componentProps} className="btn btn-info" />
      </Modal.Footer>
    </Modal>
  );
};

export default ApplicantPayment;

// interface IPayment {
//   message: string;
//   reference: string;
//   status: string;
//   trans: string;
//   transaction: string;
//   trxref: string;
// }
