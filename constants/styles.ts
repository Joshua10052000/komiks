const createSizes = (length: number = 96) => {
  const sizes: Record<string, number> = {};

  for (let i = 0; i <= length; i++) {
    sizes[i] = 4 * i;
  }

  return sizes;
};

const styles = {
  /**
   * Sizes are incremented by 4, starting from 0 to 96.
   */
  sizes: createSizes(),
};

export default styles;
