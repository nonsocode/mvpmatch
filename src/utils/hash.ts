 const hash = (string: string) => {
  var hash = 0
  for (var i = 0; i < string.length; i++) {
    var char = string.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash 
  }
  return hash
}

export const stringToColour = (string: string) =>  {
  const stringHash = hash(string)
  var colour = '#';
  for (let i = 0; i < 3; i++) {
    let value = (stringHash >> (i * 8)) & 0xFF;
    colour +=  value.toString(16).padStart(2, '0');
  }
  return colour;
}