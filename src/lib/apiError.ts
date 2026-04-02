export const getApiErrorMessage = (
  error: unknown,
  fallback = "Đã có lỗi xảy ra. Vui lòng thử lại.",
) => {
  const maybeAxios = error as {
    response?: { data?: { message?: string; msg?: string } };
    message?: string;
  };
  return (
    maybeAxios?.response?.data?.message ||
    maybeAxios?.response?.data?.msg ||
    maybeAxios?.message ||
    fallback
  );
};
