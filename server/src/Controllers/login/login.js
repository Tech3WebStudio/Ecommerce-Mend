const authThird = async (decodedToken) => {
  try {
    const { uid, email, name, picture } = decodedToken;

    return {
      uid,
      email,
      name,
      picture,
      isAuth: true,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = authThird;
