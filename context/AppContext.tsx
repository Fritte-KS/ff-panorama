import { createContext, PropsWithChildren, useState } from "react";

interface Props {
  isPortrait: boolean;
  setIsPortrait: (value: boolean) => void;
  sliderFocal: number;
  setSliderFocal: (value: number) => void;
  inputFocal: string;
  setInputFocal: (value: string) => void;
}

export const AppContext = createContext<Props | undefined>(undefined);

export default function AppProvider({ children }: PropsWithChildren<{}>) {
  const [isPortrait, setIsPortrait] = useState(false);
  const [sliderFocal, setSliderFocal] = useState(16);
  const [inputFocal, setInputFocal] = useState(String(sliderFocal));

  return (
    <AppContext.Provider
      value={{
        isPortrait,
        setIsPortrait,
        sliderFocal,
        setSliderFocal,
        inputFocal,
        setInputFocal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
