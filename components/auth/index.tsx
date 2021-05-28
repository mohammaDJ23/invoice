import { FormEvent, useContext, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { signIn } from "next-auth/client";

import { fetchData } from "../../shared/hooks/use-fetch-data";
import { useFormValidation } from "../../shared/hooks/use-form-validation";
import Button from "../../shared/ui/button";
import Inputs from "./inputs";
import Modal from "../../shared/ui/modal";
import Spinner from "../../shared/ui/spinner";
import { ErrorContext } from "../../shared/context/error";
import { ModalContext } from "../../shared/context/modal";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { onInput, isFormValid, inputs, formSwitchHandler } = useFormValidation();
  const { loading, data, fetchInvoice } = fetchData();
  const { modalHandler } = useContext(ModalContext);
  const { errorHandler, error } = useContext(ErrorContext);

  useEffect(() => {
    formSwitchHandler(isLogin);
  }, [isLogin, formSwitchHandler]);

  const onSubmitHandler = async () => {
    if (!inputs || !isFormValid) {
      return;
    }

    if (isLogin) {
      setIsLoading(true);

      const result = await signIn("credentials", {
        redirect: false,
        callbackUrl: "/",
        email: inputs.email.value,
        password: inputs.password.value
      });

      if (result.error) {
        errorHandler(result.error);
        modalHandler(true);
        await router.push("/auth");
      } else {
        errorHandler("");
        modalHandler(false);
        await router.replace(result.url);
      }

      setIsLoading(false);

      return;
    }

    const response = await fetchInvoice("/api/sign-up", "POST", {
      name: inputs.name.value,
      email: inputs.email.value,
      password: inputs.password.value
    });

    if (response) {
      setIsLogin(true);
    }
  };

  return (
    <>
      {(loading || isLoading) && <Spinner />}

      {!data && <Modal action={"error"} content={error} />}

      <div className="px-3 my-5">
        <div className="text-center mb-4">
          <h2>{isLogin ? "Login" : "Sign up"}</h2>
        </div>

        <form
          onSubmit={(event: FormEvent) => {
            event.preventDefault();
            onSubmitHandler();
          }}
        >
          <Inputs onInput={onInput} isLogin={isLogin} />

          <div className="my-4">
            <Button
              label={isLogin ? "Login" : "SIGN UP"}
              type="submit"
              onClick={() => onSubmitHandler()}
              disabled={!isFormValid || loading}
            />

            <Button
              type="button"
              label={`SWITCH TO ${isLogin ? "SIGN UP" : "LOGIN"}`}
              onClick={() => setIsLogin(prevState => !prevState)}
              style={{ marginLeft: "10px" }}
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Auth;
