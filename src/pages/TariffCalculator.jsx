import { useState, useRef } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Calculator from "../components/Calculator";
import Recommended from "../components/Recommended";

const PRIMARY = "#4c1d95";
const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY,
    },
  },
});

const TariffCalculator = () => {
  const [recommendedTariffs, setRecommendedTariffs] = useState([]);
  const [hasCalculated, setHasCalculated] = useState(false);
  const recommendedRef = useRef(null);

  const scrollToRecommended = () => {
    // Wait for the DOM to update with the new content
    setTimeout(() => {
      if (recommendedRef.current) {
        const yOffset = -100; // Header height + buffer
        const element = recommendedRef.current;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="w-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Calculator
            setHasCalculated={setHasCalculated}
            setRecommendedTariffs={setRecommendedTariffs}
            scrollToRecommended={scrollToRecommended}
          ></Calculator>
          <div ref={recommendedRef}>
            <Recommended
              hasCalculated={hasCalculated}
              recommendedTariffs={recommendedTariffs}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default TariffCalculator;
