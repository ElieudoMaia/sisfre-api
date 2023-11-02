export type TokenGeneratorPayload = {
  id: string;
  email: string;
  name: string;
};

export interface AccessTokenGenerator {
  generate: (payload: TokenGeneratorPayload) => Promise<string>;
}
