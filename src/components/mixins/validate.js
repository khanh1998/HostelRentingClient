const validateMixins = {
  data: () => ({
    isPositiveInt: [
      (num) => Math.sign(Number(num)) === 1,
      (num) => Number.isInteger(Number(num)),
      (num) => console.log(num),
    ],
  }),
  methods: {
    allowedDates: (dayStr) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectDay = new Date(dayStr);
      selectDay.setHours(0, 0, 0, 0);
      return selectDay.getTime() >= today.getTime();
    },
  },
};

export default validateMixins;
