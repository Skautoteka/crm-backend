import { ISingleInputConfig } from "../interface";

/**
 * Gets the model for the task model creation.
 *
 * @returns
 */
export const getReportCreateFields = async (): Promise<ISingleInputConfig[]> => {
  return [
    {
      name: "host",
      label: "Drużyna gości",
      isRequired: true,
      placeholder: "Wpisz nazwę drużyny",
      type: "TEXT",
    },
    {
      name: "guest",
      label: "Drużyna gospodarzy",
      isRequired: true,
      placeholder: "Wpisz nazwę drużyny",
      type: "TEXT",
    },
    {
      name: "address",
      label: "Adres",
      isRequired: true,
      placeholder: "Wpisz adres zadania",
      type: "TEXT",
    },
    {
      name: "date",
      label: "Data meczu",
      isRequired: true,
      type: "DATE", 
      placeholder: "Wpisz date",
    },
    {
      name: "finished",
      label: "Zakończony",
      type: "TEXT",
      isRequired: false,
      placeholder: "Wpisz czy jest zakonczone",
    },
    {
      name: "rating",
      label: "Ocena",
      isRequired: false,
      type: "NUMBER", 
      placeholder: "Wpisz adres zadania",
    },
  ];
};