// https://coolors.co/f67408-c434a0-d81a22-fd95bb-b1df3a-f8da36-f9dd48
export type JellybeanColor =
  | '#F67408'
  | '#C434A0'
  | '#D81A22'
  | '#FD95BB'
  | '#B1DF3A'
  | '#F8DA36'
  | '#1B8CE3'
  | '#410083';

export type Jellybean = {
  id: string;
  flavor: string;
  color: JellybeanColor;
  user_id: string;
  created_time: string;
};
