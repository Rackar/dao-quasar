const asyncTryCatch = async function(promise) {
  try {
    return await promise;
  } catch(err) {
    return err;
  }
};

export default asyncTryCatch;