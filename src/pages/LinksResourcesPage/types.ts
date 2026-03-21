export interface LinkItem {
  id: string;
  title: string;
  url: string;
}

export interface FormData {
  organizationInfo: string;
  usefulLinks: LinkItem[];
  faqLinks: LinkItem[];
  partnerRelationsLinks: LinkItem[];
}

export type LinkSection = 'usefulLinks' | 'faqLinks' | 'partnerRelationsLinks';