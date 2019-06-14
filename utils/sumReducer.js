// Array reducer for calculate forecast total weight
const sumReducer = (sum=0, item) => {
  const quantity = parseInt(item.Quantity);
  return sum + quantity;
};

export default sumReducer;
