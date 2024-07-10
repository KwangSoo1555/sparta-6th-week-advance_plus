export enum UserRole {
  USER = "user",
  HOST = "host",
}

export enum SeatGrade {
  VIP = "vip",
  PREMIUM = "premium",
  GOLD = "gold",
  SILVER = "silver",
  BRONZE = "bronze",
}

export class SeatGradeInfo {
  static SeatPrice(grade: SeatGrade | null): number {
    if (grade === null) {
      return 0;
    }

    switch (grade) {
      case SeatGrade.VIP:
        return 1
      case SeatGrade.PREMIUM:
        return 1
      case SeatGrade.GOLD:
        return 1
      case SeatGrade.SILVER:
        return 1
      case SeatGrade.BRONZE:
        return 1
    }
  }

  static validatePrices(prices: { [key in SeatGrade]?: number }) {
    const gradeOrder = [
      SeatGrade.VIP,
      SeatGrade.PREMIUM,
      SeatGrade.GOLD,
      SeatGrade.SILVER,
      SeatGrade.BRONZE,
    ];

    for (let i = 1; i < gradeOrder.length; i++) {
      const lowGrade = gradeOrder[i];
      const highGrade = gradeOrder[i - 1];

      if (
        prices[lowGrade] !== undefined &&
        prices[highGrade] !== undefined &&
        prices[lowGrade] > prices[highGrade]!
      ) {
        throw new Error(
          `${lowGrade} 좌석의 가격은 ${highGrade} 좌석의 가격보다 낮을 수 없습니다.`
        );
      }
    }
  }
}