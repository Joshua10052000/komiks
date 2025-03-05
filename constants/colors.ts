const getColors = (isDark: boolean) => {
  const colors = {
    primary: isDark ? "hsl(142.1, 70.6%, 45.3%)" : "hsl(142.1, 76.2%, 36.3%)",
    background: isDark ? "hsl(20, 14.3%, 4.1%)" : "hsl(0, 0%, 100%)",
    card: isDark ? "hsl(24, 9.8%, 10%)" : "hsl(0, 0%, 100%)",
    text: isDark ? "hsl(0, 0%, 95%)" : "hsl(240, 10%, 3.9%)",
    border: isDark ? "hsl(240, 3.7%, 15.9%)" : "hsl(240, 5.9%, 90%)",
    notification: isDark ? "hsl(0, 62.8%, 30.6%)" : "hsl(0, 84.2%, 60.2%)",
  };

  return colors;
};

export default getColors;
