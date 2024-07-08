import { UserEntity } from "src/entities/users.entity";

export async function checkUserType(
  this: { createQueryBuilder: (arg: string) => any }, // 'this' 타입 명시
  email?: string,
  userId?: number,
): Promise<UserEntity | null> {
  const query = this.createQueryBuilder("user");

  if (email) {
    query.andWhere("user.email = :email", { email });
  }

  if (userId) {
    query.andWhere("user.userId = :userId", { userId });
  }

  return await query.getOne();
}
