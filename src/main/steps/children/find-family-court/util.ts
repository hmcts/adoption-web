import config from 'config';

export const getCourtEmailId = (key: string): string => {
  const courtKey: string = key && key.trim().length > 0 ? key.trim().toLowerCase() : 'court name not provided';
  const map = new Map<string, string>([
    ['chelmsford', config.get('localCourt.emailId.CHELMSFORD_FAMILY_COURT')],
    ['oxford', config.get('localCourt.emailId.OXFORD_FAMILY_COURT')],
    ['medway', config.get('localCourt.emailId.MEDWAY_FAMILY_COURT')],
    ['portsmouth', config.get('localCourt.emailId.PORTSMOUTH_FAMILY_COURT')],
    ['leeds', config.get('localCourt.emailId.LEEDS_FAMILY_COURT')],
    ['northampton', config.get('localCourt.emailId.NORTHAMPTON_FAMILY_COURT')],
    ['worcester', config.get('localCourt.emailId.WORCESTER_FAMILY_COURT')],
    ['newport', config.get('localCourt.emailId.NEWPORT_GWENT_FAMILY_COURT')],
    ['liverpool', config.get('localCourt.emailId.LIVERPOOL_FAMILY_COURT')],
    ['central london', config.get('localCourt.emailId.CENTRAL_LONDON_FAMILY_COURT')],
    ['reading', config.get('localCourt.emailId.READING_FAMILY_COURT')],
  ]);
  for (const mKey of map.keys()) {
    if (courtKey.includes(mKey)) {
      return map.has(mKey) ? (map.get(mKey) as string) : config.get('localCourt.emailId.FALLBACK_EMAIL_ID');
    }
  }
  return map.has(key) ? (map.get(key) as string) : config.get('localCourt.emailId.FALLBACK_EMAIL_ID');
};
