type Payload = {
  id: string;
  email: string;
  name: string;
};

export interface AccessTokenGenerator {
  generate: (payload: Payload) => Promise<string>;
}
