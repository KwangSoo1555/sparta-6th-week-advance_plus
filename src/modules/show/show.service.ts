import { 
  Injectable, 
  NotFoundException, 
  ForbiddenException 
} from "@nestjs/common";

import { ShowRepository } from "src/modules/show/show.repository";

import { CreateShowDto, UpdateShowDto } from "src/dto/show.dto";

@Injectable()
export class ShowService {
  constructor(
    private readonly showRepository: ShowRepository
  ) {}

  async createShow(createShowDto: CreateShowDto) {
    return this.showRepository.createShow(createShowDto);
  }

  async getShowsAll() {
    return this.showRepository.getShowsAll();
  }

  async getShowsDetailsByGenre(genre: string) {
    return this.showRepository.getShowsDetailsByGenre(genre);
  }

  async getShowDetails(showId: number) {
    return this.showRepository.getShowDetails(showId);
  }

  async updateShow(
    showId: number,
    userId: number,
    updateShowDto: UpdateShowDto,
  ) {
    const show = await this.showRepository.getShowDetails(showId);

    // 공연 수정 권한 체크
    if (show.userByUserEntity.userId !== userId)
      throw new ForbiddenException("You are not allowed to update this show");

    return this.showRepository.updateShow(updateShowDto, showId);
  }

  async deleteShow(showId: number, userId: number) {
    const show = await this.showRepository.getShowDetails(showId);

    // 공연 삭제 권한 체크
    if (show.userByUserEntity.userId !== userId)
      throw new ForbiddenException("You are not allowed to delete this show");

    const deletedShow = await this.showRepository.deleteShow(showId);

    if (deletedShow.affected === 0) throw new NotFoundException("Show not found");
  }
}
