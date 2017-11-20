import {User} from '../user-profile/user';

export interface Squadre {
  Uid?: string;
  capitan_uid?: string;
  nome?: string;
  logo?: string;
  player?: User;
  giocatori?: User[];
  user1Uid?: string;
  user2Uid?: string;
  user3Uid?: string;
  user4Uid?: string;
  user1Name?: string;
  user2Name?: string;
  user3Name?: string;
  user4Name?: string;


}
