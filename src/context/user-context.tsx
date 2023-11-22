import React, { ReactNode, createContext, useState } from 'react';

interface UserProviderProps {
    children: ReactNode;
}

interface IUserData {
  name: string;
  phone: string;
  email: string;
  selectedImage: any;
  town: string;
  postOffice: string;
  paymentMethod: string;
}

interface UserContextProps {
  userData: IUserData;
  setUserData: React.Dispatch<React.SetStateAction<IUserData>>;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageClick: (imageSrc: any) => void;
  handlePaymentMethodChange: (method: string) => void;
  onCalcSymbolsOnlyChange: (event: any) => void;
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  authorized: boolean;
  setAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = createContext<UserContextProps>({
  userData: {
    name: '',
    phone: '',
    email: '',
    selectedImage: null,
    town: '',
    postOffice: '',
    paymentMethod: '',
  },
  setUserData: () => {},
  handleInputChange: () => {},
  handleImageClick: () => {},
  handlePaymentMethodChange: () => {},
  onCalcSymbolsOnlyChange: () => {},
  isActive: false,
  setIsActive: () => {},
  authorized: false,
  setAuthorized: () => {},
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [authorized, setAuthorized] = useState(localStorage.getItem('authorized') === 'true');
  const [userData, setUserData] = useState<IUserData>({
    name: '',
    phone: '',
    email: '',
    selectedImage: null,
    town: '',
    postOffice: '',
    paymentMethod: '',
  });
  const [isActive, setIsActive] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageClick = (imageSrc: any) => {
    setUserData((prevData) => ({
      ...prevData,
      selectedImage: imageSrc,
    }));
  };

  const handlePaymentMethodChange = (method: string) => {
    setUserData((prevData) => ({
      ...prevData,
      paymentMethod: method,
    }));
  };

  const onCalcSymbolsOnlyChange = (event: any) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const isValidNumber = new RegExp("[0-9]").test(keyValue);

    if (!isValidNumber) {
      event.preventDefault();
      return;
    }
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        handleInputChange,
        handleImageClick,
        handlePaymentMethodChange,
        onCalcSymbolsOnlyChange,
        isActive,
        setIsActive,
        authorized,
        setAuthorized
      }}
    >
      {children}
    </UserContext.Provider>
  );
};