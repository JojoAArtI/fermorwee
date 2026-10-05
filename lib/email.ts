// Shared by the waitlist form and the API route, so client and server agree.
const EMAIL = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

export function isValidEmail(email: string) {
  return email.length <= 254 && EMAIL.test(email);
}
