import Typography from "@mui/material/Typography";

export default function Recommended({ hasCalculated, recommendedTariffs }) {
  return (
    <>
      {hasCalculated && (
        <div className="mt-12">
          <Typography
            variant="h5"
            component="h2"
            className="text-center !font-bold !mb-8 text-gray-800"
          >
            Рекомендованные тарифы
          </Typography>
          {recommendedTariffs.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendedTariffs.map((tariff, index) => {
                let borderClass = "border-transparent";
                let shadowClass = "shadow-lg hover:shadow-2xl";
                let rankBadge = null;

                if (index === 0) {
                  borderClass = "border-2 border-yellow-400";
                  rankBadge = (
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                      Лучший выбор
                    </div>
                  );
                } else if (index === 1) {
                  borderClass = "border-2 border-gray-300";
                  rankBadge = (
                    <div className="absolute -top-3 -right-3 bg-gray-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                      2-е место
                    </div>
                  );
                } else if (index === 2) {
                  borderClass = "border-2 border-orange-300";
                  rankBadge = (
                    <div className="absolute -top-3 -right-3 bg-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                      3-е место
                    </div>
                  );
                }

                return (
                  <div
                    key={tariff.id}
                    className={`relative bg-white p-6 rounded-xl hover:-translate-y-1 transition-all duration-300 flex flex-col ${borderClass} ${shadowClass}`}
                  >
                    {rankBadge}
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold text-purple-700">
                        {tariff.name}
                      </h3>
                      <p className="text-3xl font-extrabold my-4 text-gray-900">
                        {tariff.price}
                        <span className="text-lg font-medium text-gray-500">
                          {" "}
                          сомони/мес
                        </span>
                      </p>
                      <ul className="text-gray-600 space-y-3">
                        {tariff.minutes > 0 && (
                          <li className="flex items-center">
                            <svg
                              className="w-5 h-5 mr-2 text-green-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                            <span>{tariff.minutes} минут</span>
                          </li>
                        )}
                        {tariff.megabytes > 0 && (
                          <li className="flex items-center">
                            <svg
                              className="w-5 h-5 mr-2 text-green-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                            <span>{tariff.megabytes} МБ интернета</span>
                          </li>
                        )}
                        {tariff.sms > 0 && (
                          <li className="flex items-center">
                            <svg
                              className="w-5 h-5 mr-2 text-green-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                            <span>{tariff.sms} СМС</span>
                          </li>
                        )}
                      </ul>
                    </div>
                    <button
                      className={`mt-6 w-full bg-[#4c1d95] text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-300`}
                    >
                      Подключить
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <Typography className="text-center text-gray-500 text-lg mt-6">
              Подходящих тарифов не найдено. Пожалуйста, измените ваши критерии
              и попробуйте снова.
            </Typography>
          )}
        </div>
      )}
    </>
  );
}
