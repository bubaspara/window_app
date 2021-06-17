export const deleteFeed = async (id) => {
  await fetch(`${process.env.REACT_APP_BASE_URL}/feed/delete/${id}`, {
    method: "DELETE",
  });
};
