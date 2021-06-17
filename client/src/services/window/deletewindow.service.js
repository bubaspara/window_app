export const deleteWindow = async (id) => {
  await fetch(`${process.env.REACT_APP_BASE_URL}/window/delete/${id}`, {
    method: "DELETE",
  });
};
