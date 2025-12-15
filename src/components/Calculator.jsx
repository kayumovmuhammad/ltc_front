import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { API_URL } from "../config";

export default function Calculator({
  setRecommendedTariffs,
  setHasCalculated,
  scrollToRecommended,
}) {
  const [minutes, setMinutes] = useState(100);
  const [megabytes, setMegabytes] = useState(20 * 1024);
  const [sms, setSms] = useState(50);
  const [priceRange, setPriceRange] = useState([40, 160]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const qMinutes = searchParams.get("minutes");
    const qMb = searchParams.get("mb");
    const qSms = searchParams.get("sms");
    const qPriceMin = searchParams.get("price_min");
    const qPriceMax = searchParams.get("price_max");

    if (qMinutes) setMinutes(Number(qMinutes));
    if (qMb) setMegabytes(Number(qMb));
    if (qSms) setSms(Number(qSms));
    if (qPriceMin || qPriceMax) {
      setPriceRange([
        qPriceMin ? Number(qPriceMin) : 0,
        qPriceMax ? Number(qPriceMax) : 1000
      ]);
    }
  }, [searchParams]);
  const handleCalculate = () => {
    // const filtered = allTariffs.filter(
    //   (tariff) =>
    //     tariff.minutes >= minutes &&
    //     tariff.gigabytes >= gigabytes &&
    //     tariff.sms >= sms &&
    //     tariff.price >= priceRange[0] &&
    //     tariff.price <= priceRange[1],
    // );
    setIsLoading(true);
    fetch(`${API_URL}/calculator`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
      },
      body: JSON.stringify({
        minutes: minutes,
        mbs: megabytes,
        sms: sms,
        min_sum: priceRange[0],
        max_sum: priceRange[1],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRecommendedTariffs(data.data.map((tariff) => { return { name: tariff.name, price: tariff.price, minutes: tariff.minutes, sms: tariff.sms, megabytes: tariff.mbs } }));
        setHasCalculated(true);
        if (scrollToRecommended) {
          scrollToRecommended();
        }
      })
      .catch((error) => {
        console.error("Error fetching recommended tariffs:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg border border-gray-200">
      <Typography
        variant="h4"
        component="h1"
        className="text-center !font-bold !mb-4 text-gray-800"
      >
        Калькулятор тарифов
      </Typography>
      <Typography className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        Подберите идеальный тариф, указав желаемое количество минут, гигабайт,
        СМС и подходящий диапазон цен.
      </Typography>

      <Box className="space-y-8">
        <div>
          <Typography gutterBottom className="!font-medium text-gray-700">
            Минуты: {minutes}
          </Typography>
          <Slider
            value={minutes}
            onChange={(e, newValue) => setMinutes(newValue)}
            aria-labelledby="minutes-slider"
            min={0}
            max={2000}
            step={50}
            color="primary"
          />
        </div>

        <div>
          <Typography gutterBottom className="!font-medium text-gray-700">
            Мегабайты (МБ): {megabytes}
          </Typography>
          <Slider
            value={megabytes}
            onChange={(e, newValue) => setMegabytes(newValue)}
            aria-labelledby="mb-slider"
            min={0}
            max={200 * 1024}
            step={1024 * 5}
            color="primary"
          />
        </div>

        <div>
          <Typography gutterBottom className="!font-medium text-gray-700">
            СМС: {sms}
          </Typography>
          <Slider
            value={sms}
            onChange={(e, newValue) => setSms(newValue)}
            aria-labelledby="sms-slider"
            min={0}
            max={2000}
            step={50}
            color="primary"
          />
        </div>

        <div>
          <Typography gutterBottom className="!font-medium text-gray-700">
            Цена (сомони): {`${priceRange[0]} - ${priceRange[1]}`}
          </Typography>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            aria-labelledby="price-range-slider"
            min={0}
            max={1000}
            step={10}
            color="primary"
          />
        </div>
      </Box>

      <Box className="text-center mt-10">
        <Button
          variant="contained"
          onClick={handleCalculate}
          disabled={isLoading}
          sx={{
            backgroundColor: "#4c1d95",
            color: "white",
            "&:hover": {
              backgroundColor: "#371569",
            },
            padding: "12px 32px",
            borderRadius: "9999px",
            fontWeight: "bold",
            textTransform: "none",
            height: "56px",
            fontSize: "1rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {isLoading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "Рассчитать"
          )}
        </Button>
      </Box>
    </div>
  );
}
