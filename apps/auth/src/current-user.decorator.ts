import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserDocument } from './users/models/users.schema';

const getCurrentUseByContext = (context: ExecutionContext): UserDocument => {
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUseByContext(context),
);
