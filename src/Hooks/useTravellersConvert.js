function useTravellersConvert() {
  function join(travellers) {
    return travellers
      .map((rom) => {
        if (rom.children.length === 0) {
          return rom.adults;
        } else {
          return `${rom.adults}-${rom.children.map((ch) => ch.age)}`;
        }
      })
      .join("|");
  }
  function split(travellers) {
    return travellers.split("|").map((rom) => {
      const r = rom.split("-");
      return {
        adults: parseInt(r[0]),
        children:
          r[1]?.split(",").map((ch) => {
            return { age: parseInt(ch) };
          }) || [],
      };
    });
  }
  return { join, split };
}
export default useTravellersConvert;
