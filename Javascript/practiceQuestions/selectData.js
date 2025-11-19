function selectData(sessions, options) {
    const matcherCriteria = (session) => {
      // filter by user id
      if (options?.user && session.user !== options.user) return false;
      // filter by min duration
      if (options?.minDuration  && session.duration < options.minDuration)
        return false;
  
      //filter by equipment
      if (
        options?.equipment &&
        !options.equipment.some((eq) => session.equipment.includes(eq))
      )
        return false;
  
      return true;
    };
  
    if (options?.merge) {
      const sessionsMap = new Map();
  
      sessions.forEach((session, index) => {
        // if not in the map then put in the map
        if (!sessionsMap.has(session.user)) {
          sessionsMap.set(session.user, {
            user: session.user,
            duration: 0,
            equipment: new Set(),
            lastIndex: index,
          });
        }
        // now update the map
        const entry = sessionsMap.get(session.user);
        entry.duration += session.duration;
        session.equipment.forEach((eq) => entry.equipment.add(eq));
        entry.lastIndex = index;
      });
  
      // sort the sessions by the last index
      const mergedSessions = Array.from(sessionsMap.values())
        .sort((a, b) => a.lastIndex - b.lastIndex)
        .map((entry) => {
          return {
            user: entry.user,
            duration: entry.duration,
            equipment: [...entry.equipment].sort(),
          };
        });
       return mergedSessions.filter(matcherCriteria);
    } else {
      return sessions.filter(matcherCriteria);
    }
  }


const sessions = [
    { user: 8, duration: 50, equipment: ['bench'] },
    { user: 7, duration: 150, equipment: ['dumbbell', 'kettlebell'] },
    { user: 1, duration: 10, equipment: ['barbell'] },
    { user: 7, duration: 100, equipment: ['bike', 'kettlebell'] },
    { user: 7, duration: 200, equipment: ['bike'] },
    { user: 2, duration: 200, equipment: ['treadmill'] },
    { user: 2, duration: 200, equipment: ['bike'] },
];

console.log(selectData(sessions, { user: 7, minDuration: 100, equipment: ['bike'] }));

  