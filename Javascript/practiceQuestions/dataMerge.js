/**
 * @param {Array<{user: number, duration: number, equipment: Array<string>}>} sessions
 * @return {Array}
 */
export default function mergeData(sessions) {
  const map = new Map();

  for (const { user, duration, equipment } of sessions) {
    // if the map doesn't contain the user
    if (!map.has(user)) {
      map.set(user, { user, duration, equipment: new Set(equipment) }); // store in map
    } else {
        // otherwise get the userdata from map and then do the needful as required
      const data = map.get(user);
      data.duration += duration;
      equipment.forEach(eq => data.equipment.add(eq));
    }
  }

  // 
  return Array.from(map.values()).map(({ user, duration, equipment }) => ({
    user,
    duration,
    equipment: [...equipment].sort(),
  }));
}