interface DefaultResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface SimpleStat {
  balance: number;
  id: number;
  name: string;
}

export interface AllSimpleStat {
  bank: SimpleStat[];
  card: SimpleStat[];
}

export interface AllSimpleStatResponse extends DefaultResponse<AllSimpleStat> {}
