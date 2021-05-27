import { createContext, useCallback, useState } from "react";

import * as Invoice from "../../types";

export const ErrorContext = createContext<Invoice.Invoice.ErrorOptions>({
  error: "",
  errorHandler: () => {}
});

const ErrorProvider: React.FC = ({ children }) => {
  const [error, setError] = useState("");

  const errorHandler = useCallback((error: string) => setError(error), []);

  return (
    <ErrorContext.Provider value={{ error, errorHandler }}>
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorProvider;
