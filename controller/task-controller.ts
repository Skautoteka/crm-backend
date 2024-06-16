import Task from "../db/models/task.model";
import { ISingleInputConfig } from "../interface";

/**
 * Gets the model for the task model creation.
 *
 * @returns
 */
export const getTaskCreateFields = async (): Promise<ISingleInputConfig[]> => {
  return [
    { name: "host", label: "Drużyna gości", isRequired: true, placeholder: "Wpisz nazwę drużyny", type: "TEXT" },
    { name: "guest", label: "Drużyna gospodarzy", isRequired: true, placeholder: "Wpisz nazwę drużyny", type: "TEXT" },
    { name: "address", label: "Adres", isRequired: true, placeholder: "Wpisz adres zadania", type: "TEXT" },
    // { name: "date", label: "Data wykonania zadania", isRequired: true, placeholder: "Wpisz datę", type: "TEXT" },
  ];
};

/**
 * Returns all tasks.
 */
export const getAll = async (): Promise<Task[]> => {
  return await Task.findAll();
};

/**
 * Removes the task from the database.
 *
 * @param id
 */
export const remove = async (id: string): Promise<void> => {
  const task = await Task.findOne({ where: { id } });

  if (task) {
    await task.destroy();
  }
};
