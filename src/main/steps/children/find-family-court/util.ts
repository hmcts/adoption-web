export const getCourtEmailId = (key: string): string => {
  const courtKey: string = key && key.trim().length > 0 ? key.trim().toLowerCase() : 'chelmsford family court';
  const map = new Map<string, string>([
    ['chelmsford family court', 'chelmsfordadoptionapplication@justice.gov.uk'],
    ['oxford family court', 'Oxfordadoptionapplication@justice.gov.uk'],
    ['medway family court', 'Medwayadoptionapplication@justice.gov.uk'],
    ['portsmouth family court', 'Portsmouthadoptionapplication@justice.gov.uk'],
    ['leeds family court', 'Leedsadoptionapplication@justice.gov.uk'],
    ['northampton family court', 'Northamptonadoptionapplication@justice.gov.uk'],
    ['worcester family court', 'NewportGwentadoptionapplication@justice.gov.uk'],
    ['newport (gwent) family court', 'NewportGwentadoptionapplication@justice.gov.uk'],
  ]);
  return map.has(courtKey) ? (map.get(courtKey) as string) : 'chelmsfordadoptionapplication@justice.gov.uk';
  /*
  South East
  Chelmsford Family Court -  chelmsfordadoptionapplication@justice.gov.uk
  Oxford Family Court - Oxfordadoptionapplication@justice.gov.uk 
  Medway Family Court - Medwayadoptionapplication@justice.gov.uk 
  South West
  Portsmouth Family Court -  Portsmouthadoptionapplication@justice.gov.uk 
  North East
  Leeds Family Court –  Leedsadoptionapplication@justice.gov.uk 
  Midlands -
  Northampton Family Court - Northamptonadoptionapplication@justice.gov.uk 
  Worcester Family Court – NewportGwentadoptionapplication@justice.gov.uk 
  Wales
  Newport (Gwent) Family Court - NewportGwentadoptionapplication@justice.gov.uk 
    */
};
