export function getCurrentDir() {
  const proccessDir = process.cwd();
  return proccessDir.split('/').pop();
}
