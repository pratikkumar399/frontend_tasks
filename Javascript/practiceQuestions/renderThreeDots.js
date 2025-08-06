
// this is just a sample code, that can be used to render three dots in a carousel, with the current, next and prev dots

const getThreeDots = (total, current) => {
  if (total < 3) {
    return [...Array(total)].map((_, i) => (
      <div key={i} className={`${s.dot} ${i === current ? s.activeDot : ''}`} />
    ));
  }

  const prev = (current - 1 + total) % total;
  const next = (current + 1) % total;

  return [prev, current, next].map((index, i) => (
    <div key={i} className={`${s.dot} ${index === current ? s.activeDot : ''}`} />
  ));
};

getThreeDots(10,1)