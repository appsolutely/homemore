const memoize = (func) => {
  const memo = {};
  return () => {
    const key = JSON.stringify(arguments);
    return (key in memo) ? memo[key] : memo[key] = func.apply(this, arguments);
  };
};


export default memoize;

