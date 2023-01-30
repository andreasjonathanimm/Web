const { averageExams, isStudentPassExam } = require("../gradeCalculations");

describe("grade calculations", () => {
  test("it should return exact average", () => {
    const listValueOfExams = [80, 100, 100, 80];
    expect(averageExams(listValueOfExams)).toEqual(90);
  });

  test("it should handle non-number", () => {
    const listValueofExams = [80, "a", "100", 80];
    expect(() => averageExams(listValueofExams)).toThrow();
  });

  test('it should return exam passed status', () => {
      const listValueOfExams = [80, 100, 100, 80];
      expect(isStudentPassExam(listValueOfExams, 'Budi')).toEqual(true);
  })

  test('it should return exam failed status', () => {
      const listValueOfExams = [50, 40, 70, 80];
      expect(isStudentPassExam(listValueOfExams, 'Budi')).toEqual(false);
  })
});

// npm run test
// npm run test -- --coverage