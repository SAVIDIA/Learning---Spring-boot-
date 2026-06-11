import api from "./api";

export const getAuditLogs = async () => {
  try {
    const res = await api.get("/audit");
    return res.data?.data || [];
  } catch (error) {
    if ([403, 404].includes(error?.response?.status)) {
      return [];
    }

    throw error;
  }
};
