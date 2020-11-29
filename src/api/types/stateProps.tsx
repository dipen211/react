import { RouteComponentProps } from "react-router-dom";
import { TFunction } from "i18next";
import { WithTranslation } from "react-i18next";
export interface IState {
  employees: any[];
  selectValue: any[];
  isOpen: any;
}
export interface IProps extends RouteComponentProps,WithTranslation {
  t: TFunction;
}