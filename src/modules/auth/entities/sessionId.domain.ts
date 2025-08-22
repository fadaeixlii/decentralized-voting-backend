import { IdMaker } from 'src/types/strings';

export const SessionId = IdMaker.mk<'SessionId'>();
export type SessionId = IdMaker.Infer<typeof SessionId>;
