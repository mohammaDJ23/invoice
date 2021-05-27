import React, { createContext, useCallback, useState } from "react";

import * as Invoice from "../../types";

export const ModalContext = createContext<Invoice.Invoice.ModalContextOptions>({
  isShow: false,
  modalHandler: (action: boolean) => {}
});

const ModalProvider: React.FC = ({ children }) => {
  const [isShow, setIsShow] = useState(false);

  const modalHandler = useCallback((action: boolean) => setIsShow(action), []);

  return (
    <ModalContext.Provider value={{ isShow, modalHandler }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
