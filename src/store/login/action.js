export function login(data) {
  return {
    type: 'login',
    data,
  };
}

export function logout(data) {
  return {
    type: 'logout',
    data,
  };
}
