const memoize = (func) => {
  const memo = {};
  return (...args) => {
  	console.log('in helpers, arguments are: ', args)
  	console.log('I am what is being memoized', func)
    const key = JSON.stringify(args);
    console.log('it has to do with the this binding', this)
    return (key in memo) ? memo[key] : memo[key] = func.apply(this, args);
  };
};


export default memoize;

