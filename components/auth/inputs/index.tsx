import Input from "../../../shared/ui/input";
import * as Invoice from "../../../shared/types";

const Inputs: React.FC<Invoice.Invoice.InputsOptions> = ({ isLogin, onInput }) => {
  return (
    <>
      {!isLogin && (
        <Input
          type="text"
          placeholder={Invoice.Invoice.InputNameOptions.NAME}
          name={Invoice.Invoice.InputNameOptions.NAME}
          onInput={onInput}
          errorText="The title should be between 3 - 30 characters and only the letters of the alphabet are allowed."
        />
      )}

      <Input
        type="email"
        placeholder={Invoice.Invoice.InputNameOptions.EMAIL}
        name={Invoice.Invoice.InputNameOptions.EMAIL}
        onInput={onInput}
        errorText="Invalid email, please enter a valid email."
      />

      <Input
        type="password"
        placeholder={Invoice.Invoice.InputNameOptions.PASSWORD}
        name={Invoice.Invoice.InputNameOptions.PASSWORD}
        onInput={onInput}
        errorText="Invalid password, please enter a valid password."
      />
    </>
  );
};

export default Inputs;
