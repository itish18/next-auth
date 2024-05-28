//import resend or any other mail service

// set api key

export const sendVerificationEmail = async (email, token) => {
  const confirmationLink = `http://localhost:3000/new-verification?token=${token}`;
  // send to link to the email
};

export const sendPasswordResetEmail = async (email, token) => {
  const confirmationLink = `http://localhost:3000/new-password?token=${token}`;
  // send to link to the email
};
