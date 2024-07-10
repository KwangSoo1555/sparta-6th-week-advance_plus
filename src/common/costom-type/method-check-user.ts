// checkUser 메서드가 userId 또는 email로 유저를 조회하는 메서드

// export async function checkUserType(
//   this: { createQueryBuilder: (arg: string) => any }, // 'this' 타입 명시
//   params: { email?: string; userId?: number }
// ) {
//   const query = this.createQueryBuilder("user");

//   if (params.email)
//     query.andWhere("user.email = :email", { email: params.email });

//   if (params.userId)
//     query.andWhere("user.userId = :userId", { userId: params.userId });

//   return await query.getOne();
// }
