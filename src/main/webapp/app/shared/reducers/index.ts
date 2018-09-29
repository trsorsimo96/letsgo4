import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import partner, {
  PartnerState
} from 'app/entities/partner/partner.reducer';
// prettier-ignore
import distributor, {
  DistributorState
} from 'app/entities/distributor/distributor.reducer';
// prettier-ignore
import town, {
  TownState
} from 'app/entities/town/town.reducer';
// prettier-ignore
import company, {
  CompanyState
} from 'app/entities/company/company.reducer';
// prettier-ignore
import route, {
  RouteState
} from 'app/entities/route/route.reducer';
// prettier-ignore
import resa, {
  ResaState
} from 'app/entities/resa/resa.reducer';
// prettier-ignore
import travel, {
  TravelState
} from 'app/entities/travel/travel.reducer';
// prettier-ignore
import configFare, {
  ConfigFareState
} from 'app/entities/config-fare/config-fare.reducer';
// prettier-ignore
import configCommission, {
  ConfigCommissionState
} from 'app/entities/config-commission/config-commission.reducer';
// prettier-ignore
import planning, {
  PlanningState
} from 'app/entities/planning/planning.reducer';
// prettier-ignore
import cabin, {
  CabinState
} from 'app/entities/cabin/cabin.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly partner: PartnerState;
  readonly distributor: DistributorState;
  readonly town: TownState;
  readonly company: CompanyState;
  readonly route: RouteState;
  readonly resa: ResaState;
  readonly travel: TravelState;
  readonly configFare: ConfigFareState;
  readonly configCommission: ConfigCommissionState;
  readonly planning: PlanningState;
  readonly cabin: CabinState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  partner,
  distributor,
  town,
  company,
  route,
  resa,
  travel,
  configFare,
  configCommission,
  planning,
  cabin,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
