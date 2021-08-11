export function random (list: any[]): any {
  return list[Math.floor((Math.random() * list.length))];
}

export default random;
