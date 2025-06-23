export function shuffle(array) {
  const arrayCopy = array.slice();
  let lastIndex = arrayCopy.length;
  while (lastIndex > 0) {
    const randomIndex = Math.floor(Math.random() * lastIndex);
    lastIndex--;

    // Swap the values by destructuring
    [arrayCopy[lastIndex], arrayCopy[randomIndex]] = [
      arrayCopy[randomIndex],
      arrayCopy[lastIndex],
    ];
  }
  return arrayCopy;
}
