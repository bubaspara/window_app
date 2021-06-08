export const deleteWindow = async (id) => {
  await fetch(`http://localhost:3001/window/delete/${id}`, {
    method: "DELETE",
  });
};
