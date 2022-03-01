import { v4 } from "public-ip";

export const getIP = async (): Promise<string | null> => {
  try {
    const ip = await v4();

    return ip;
  } catch (error) {
    console.log(error);
    return null;
  }
};
