import { UserState } from '../services/user/user-slice';

export const userTestInitialState: UserState = {
  user: null,
  isAuthChecked: false,
  loading: false,
  error: null
};
