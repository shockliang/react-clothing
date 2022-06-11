import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import Button, {ButtonStyle} from "../button/button.component";
import {FormContainer, PaymentFormContainer} from "./payment-form.styles";
import {FormEvent} from "react";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) return;

  };

  return (
    <PaymentFormContainer>
      <FormContainer>
        <h2>Credit Card Payment: </h2>
        <CardElement/>
        <Button buttonType={ButtonStyle.Inverted}>Pay now</Button>
      </FormContainer>
    </PaymentFormContainer>
  )
}

export default PaymentForm;
