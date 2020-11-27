import { RouteComponentProps } from "react-router-dom";
import { TFunction } from "i18next";
export interface IState {
  employees: any[];
}
export interface IProps extends RouteComponentProps {
  t: TFunction;
}