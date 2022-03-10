import config from 'config';

export const getCourtEmailId = (key: string): string => {
  const courtKey: string = key && key.trim().length > 0 ? key.trim().toLowerCase() : 'chelmsford family court';
  const map = new Map<string, string>([
    ['chelmsford family court', config.get('localCourt.emailId.CHELMSFORD_FAMILY_COURT')],
    ['oxford family court', config.get('localCourt.emailId.OXFORD_FAMILY_COURT')],
    ['medway family court', config.get('localCourt.emailId.MEDWAY_FAMILY_COURT')],
    ['portsmouth family court', config.get('localCourt.emailId.PORTSMOUTH_FAMILY_COURT')],
    ['leeds family court', config.get('localCourt.emailId.LEEDS_FAMILY_COURT')],
    ['northampton family court', config.get('localCourt.emailId.NORTHAMPTON_FAMILY_COURT')],
    ['worcester family court', config.get('localCourt.emailId.WORCESTER_FAMILY_COURT')],
    ['newport (gwent) family court', config.get('localCourt.emailId.NEWPORT_GWENT_FAMILY_COURT')],
  ]);
  return map.has(courtKey) ? (map.get(courtKey) as string) : config.get('localCourt.emailId.FALLBACK_EMAIL_ID');
};
