import { FastifyReply, FastifyRequest } from "fastify";
import { container } from "tsyringe";

import { IUpdateAvatarDTO } from "../../dtos/Iupdate-avatarDTO";
import { UpdateAvatarUseCase } from "./update-avatar.useCase";

export class UpdateAvatarController {
  async handle(
    request: FastifyRequest<{ Body: IUpdateAvatarDTO }>,
    reply: FastifyReply
  ) {
    const { id: userId } = request.user;
    const { id: contactId, avatarUrl } = request.body;

    const updateAvatarUseCase = container.resolve(UpdateAvatarUseCase);

    await updateAvatarUseCase.execute(userId, contactId, avatarUrl);

    return reply.status(200).send();
  }
}
