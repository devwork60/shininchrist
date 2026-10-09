export interface DailyConnectData {
  heading: string;
  /** Wordmark shown on the white card, e.g. "I AM" over "ADAM" */
  badgeTop: string;
  badgeBottom: string;
  description: string;
  cta: { text: string; url: string };
  image: string;
  /** CSS colour / variable for the section background */
  accent: string;
}
