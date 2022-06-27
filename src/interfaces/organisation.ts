export interface IOrganisation {
  organisationId: number;
  name: string;
  description: string | null;
  email: string | null;
  website: string;
  whitepaper: string | null;
  twitter: string | null;
  facebook: string | null;
  linkedin: string | null;
  instagram: string | null;
  profileImage: string | null;
  bannerImage: string | null;
}

export type IOrgApiResponse = IOrganisation;
