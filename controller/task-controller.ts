import { ISingleInputConfig } from "../interface";

/**
 * Gets the model for the task model creation.
 *
 * @returns
 */
export const getTaskCreateFields = async (): Promise<ISingleInputConfig[]> => {
  return [
    { name: "email", label: "Email", isRequired: true, placeholder: "Wpisz swój email", type: "TEXT" },
    { name: "firstName", label: "Imię", isRequired: true, placeholder: "Wpisz swoje imię", type: "TEXT" },
    { name: "lastName", label: "Nazwisko", isRequired: true, placeholder: "Wpisz swoje nazwisko", type: "TEXT" },
  ];
};
