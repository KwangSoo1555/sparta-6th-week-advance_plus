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
  static readonly VIP = {
    price: 50000,
  };

  static SeatPrice(grade: SeatGrade | null): number {
    if (grade === null) {
      return 0;
    }

    switch (grade) {
      case SeatGrade.VIP:
        return this.VIP.price;
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
      SeatGrade.BRONZE,
      SeatGrade.SILVER,
      SeatGrade.GOLD,
      SeatGrade.PREMIUM,
      SeatGrade.VIP,
    ];

    for (let i = 1; i < gradeOrder.length; i++) {
      const currentGrade = gradeOrder[i];
      const previousGrade = gradeOrder[i - 1];

      if (
        prices[currentGrade] !== undefined &&
        prices[previousGrade] !== undefined &&
        prices[currentGrade]! < prices[previousGrade]!
      ) {
        throw new Error(
          `${currentGrade} 좌석의 가격은 ${previousGrade} 좌석의 가격보다 낮을 수 없습니다.`
        );
      }
    }
  }
}