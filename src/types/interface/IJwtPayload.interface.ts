import { ERole } from '../enum/ERole.enum';

export interface IJwtPayload {
  id: string;
  email: string;
  name: string;
  role: ERole;
}
