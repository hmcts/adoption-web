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
    //Midlands
    /* ['stoke-on-trent', config.get('localCourt.emailId.STOKE-ON-TRENT_FAMILY_COURT')],
    ['leicester', config.get('localCourt.emailId.LEICESTER_FAMILY_COURT')],
    ['lincoln', config.get('localCourt.emailId.LINCOLN_FAMILY_COURT')],
    ['nottingham', config.get('localCourt.emailId.NOTTINGHAM_FAMILY_COURT')],
    ['derby', config.get('localCourt.emailId.DERBY_FAMILY_COURT')],
    ['coventry', config.get('localCourt.emailId.COVENTRY_FAMILY_COURT')],
    ['birmingham', config.get('localCourt.emailId.BIRMINGHAM_FAMILY_COURT')],
    ['wolverhampton', config.get('localCourt.emailId.WOLVERHAMPTON_FAMILY_COURT')], */
    //South West
    ['swindon', config.get('localCourt.emailId.SWINDON_FAMILY_COURT')],
    ['exeter', config.get('localCourt.emailId.EXETER_FAMILY_COURT')],
    ['plymouth', config.get('localCourt.emailId.PLYMOUTH_FAMILY_COURT')],
    ['taunton', config.get('localCourt.emailId.TAUNTON_FAMILY_COURT')],
    ['truro', config.get('localCourt.emailId.TRURO_FAMILY_COURT')],
    ['bournemouth', config.get('localCourt.emailId.BOURNEMOUTH_FAMILY_COURT')],
    ['bristol', config.get('localCourt.emailId.BRISTOL_FAMILY_COURT')],
    ['gloucestershire', config.get('localCourt.emailId.GLOUCESTERSHIRE_FAMILY_COURT')],
    //West London
    /* ['west london', config.get('localCourt.emailId.WEST_LONDON_FAMILY_COURT')],
    ['barnet', config.get('localCourt.emailId.BARNET_FAMILY_COURT')],
    ['bromley', config.get('localCourt.emailId.BROMLEY_FAMILY_COURT')],
    ['central', config.get('localCourt.emailId.CENTRAL_FAMILY_COURT')],
    ['croydon', config.get('localCourt.emailId.CROYDON_FAMILY_COURT')],
    ['east london', config.get('localCourt.emailId.EAST_LONDON_FAMILY_COURT')], */
    //South East
    /* ['luton', config.get('localCourt.emailId.LUTON_FAMILY_COURT')],
    ['norwich', config.get('localCourt.emailId.NORWICH_FAMILY_COURT')],
    ['watford', config.get('localCourt.emailId.WATFORD_FAMILY_COURT')],
    ['peterborough', config.get('localCourt.emailId.PETERBOROUGH_FAMILY_COURT')],
    ['brighton', config.get('localCourt.emailId.BRIGHTON_FAMILY_COURT')],
    ['guildford', config.get('localCourt.emailId.GUILDFORD_FAMILY_COURT')],
    ['milton keynes', config.get('localCourt.emailId.MILTON_KEYNES_FAMILY_COURT')], */
    //North East
    ['kingston-upon-hull', config.get('localCourt.emailId.KINGSTON_UPON_HULL_FAMILY_COURT')],
    ['newcastle upon tyne', config.get('localCourt.emailId.NEWCASTLE_UPON_TYNE_FAMILY_COURT')],
    ['teesside', config.get('localCourt.emailId.TEESSIDE_FAMILY_COURT')],
    ['york', config.get('localCourt.emailId.YORK_FAMILY_COURT')],
    ['sheffield', config.get('localCourt.emailId.SHEFFIELD_FAMILY_COURT')],
    //North West
    /* ['chester', config.get('localCourt.emailId.CHESTER_FAMILY_COURT')],
    ['barrow-in-furness', config.get('localCourt.emailId.BARROW-IN-FURNESS_FAMILY_COURT')],
    ['blackburn', config.get('localCourt.emailId.BLACKBURN_FAMILY_COURT')],
    ['carlisle', config.get('localCourt.emailId.CARLISLE_FAMILY_COURT')],
    ['west cumbria', config.get('localCourt.emailId.WEST_CUMBRIA_FAMILY_COURT')],
    ['manchester', config.get('localCourt.emailId.MANCHESTER_FAMILY_COURT')], */
    //Wales
    ['aberystwyth', config.get('localCourt.emailId.ABERYSTWYTH_FAMILY_COURT')],
    ['caernarfon', config.get('localCourt.emailId.CAERNARFON_FAMILY_COURT')],
    ['cardiff', config.get('localCourt.emailId.CARDIFF_FAMILY_COURT')],
    ['haverfordwest', config.get('localCourt.emailId.HAVERFORDWEST_FAMILY_COURT')],
    ['llanelli', config.get('localCourt.emailId.LLANELLI_FAMILY_COURT')],
    ['pontypridd', config.get('localCourt.emailId.PONTYPRIDD_FAMILY_COURT')],
    ['port-talbot', config.get('localCourt.emailId.PORT_TALBOT_FAMILY_COURT')],
    ['prestatyn', config.get('localCourt.emailId.PRESTATYN_FAMILY_COURT')],
    ['swansea', config.get('localCourt.emailId.SWANSEA_FAMILY_COURT')],
    ['wrexham', config.get('localCourt.emailId.WREXHAM_FAMILY_COURT')],
  ]);
  //Creating array of arrays from map. Then filtering key from map based on input string.
  const filteredElement = Array.from(map).filter(([mapKey]) => courtKey.includes(mapKey));

  //filtered element will contain a single array item something like  [['liverpool','adoptionsliverpoolcivilandfamilycourt@justice.gov.uk' ]].
  //Using index to get the email element.
  return filteredElement.length ? filteredElement[0][1] : config.get('localCourt.emailId.FALLBACK_EMAIL_ID');
};
