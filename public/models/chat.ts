export interface ChatReq {
  sender: string;
  message: string;
}

export interface ChatResSingle {
  recepient_id: string;
  text: string;
}

export interface ChatRes extends Array<ChatResSingle> {}

export interface ChatHistorySingle {
  isMine: boolean;
  message: string;
}
