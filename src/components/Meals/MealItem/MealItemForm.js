import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState } from "react";

export default function MealItemForm(props) {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const inputAmountRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = inputAmountRef.current.value;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmount < 1 ||
      enteredAmount > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    setAmountIsValid(true);

    props.onAddToCart(+enteredAmount);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={inputAmountRef}
        label="Amount"
        input={{
          id: props.id,
          type: "number",
          min: 1,
          max: 5,
          step: 1,
          defaultValue: "1",
        }}
      />
      <button type="submit">+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount from 1 to 5.</p>}
    </form>
  );
}
