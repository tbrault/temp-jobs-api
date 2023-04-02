interface User {
  name: string;
  email: string;
  password: string;
  generateToken: () => string;
  checkPassword: (candidatePassword: string) => boolean;
}

export default User;
