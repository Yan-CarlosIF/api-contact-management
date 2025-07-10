import { FastifyInstance, FastifyRequest } from "fastify";

import { IUpdateAvatarDTO } from "@/modules/contacts/dtos/Iupdate-avatarDTO";
import { AppError } from "@/shared/errors/app-error";
import { isValidImageUrl } from "@/utils/is-valid-url";

export function validImageUrlMiddleware(app: FastifyInstance) {
  app.decorate(
    "validImageUrl",
    async (request: FastifyRequest<{ Body: IUpdateAvatarDTO }>) => {
      const { avatarUrl } = request.body;

      const result = await isValidImageUrl(avatarUrl);

      if (!result.isImage) {
        throw new AppError("Invalid image URL", 400);
      }

      request.body.avatarUrl = result.finalUrl;
    }
  );
}
