import { CompleteRegistrationData } from "../types/register";

export async function registerCompany(data: CompleteRegistrationData) {
  console.log("Dados que serão enviados:", data);

  // Simula a API
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    success: true,
  };
}
