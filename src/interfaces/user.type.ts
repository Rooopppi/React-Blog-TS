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

export interface EditUserData {
  name: string;
  extra_details: string;
  skills: string;
  profession: string;
  details: string;
}
