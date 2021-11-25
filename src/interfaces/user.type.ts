/* eslint-disable camelcase */

export interface UserData {
  _id: string;
  email: string;
  name: string;
  avatar: string;
  extra_details: string;
  skills: string;
  profession: string;
  details: string;
  dateCreated: string;
}

export type EditUserData = Pick<
  UserData,
  "name" | "extra_details" | "skills" | "profession" | "details"
>;
