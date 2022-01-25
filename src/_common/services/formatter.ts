export const phoneFormatter = (phoneNumber: string) => phoneNumber ? phoneNumber.replace(/\s/g, "").replace("-", "") : undefined;
