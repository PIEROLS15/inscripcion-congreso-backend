export const getGreeting = (name?: string) => {
  return `Hola${name ? `, ${name}` : ''}! Bienvenido a tu backend 🚀`
}
