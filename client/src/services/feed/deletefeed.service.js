export const deleteFeed = async (id) => {
  await fetch(`http://localhost:3001/feed/delete/${id}`, {
    method: "DELETE",
  });
};
