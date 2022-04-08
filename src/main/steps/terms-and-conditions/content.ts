import { TranslationFn } from '../../app/controller/GetController';

const en = {
  title: 'Terms and conditions',
  thisPage:
    'By using this service you’re agreeing to these terms of use. This includes the <a class="govuk-link" href="/privacy-policy">privacy policy</a>.',
  termsAndConditionsUsers: 'Terms and conditions for professional users',
  termsAndConditionsProfessional:
    "If you are a professional user, you'll be asked to agree to the additional terms and conditions of the service after you create a MyHMCTS account.",
  whoWeAre: 'Who we are',
  managedBy:
    "This service is managed by Her Majesty's Courts and Tribunals Service (referred to as 'us' or 'we' from now on). You should check these terms and conditions regularly. We may update them at any time without notice. If you continue to use this service after the terms and conditions have changed, you are deemed to have agreed to the changes.",
  info: 'Information provided by this service',
  service:
    'This service provides information to support your claim or application. We cannot give legal advice on individual cases. You should answer the questions in the service based on your circumstances and seek legal advice if you need it.',
  stored: 'Sharing and storing data',
  dataStored:
    'Our <a class="govuk-link" href="/privacy-policy">privacy policy</a> explains where your data is stored, and who it is shared with. Our cookie policy explains how this service uses and stores cookies.',
  applicationLaw: 'Laws applying to this service',
  dispute:
    'Your use of this service and any dispute arising from its use will be  governed by and construed in accordance with the laws of England and Wales, including but not limited to the:',
  dispute1: 'Computer Misuse Act 1990',
  dispute2: 'Data Protection Act 1998 (until 25 May 2018)',
  dispute3: 'Data Protection Act 2018 (from 25 May 2018)',
  dispute4: 'General Data Protection Regulation',
  dispute5: 'Mental Capacity Act 2005',
  responsible: 'How to use this service responsibly',
  risks:
    "There are risks in using a shared computer (for example, in a library) to access this service. It's your responsibility to be aware of these risks and to avoid using any computer which may leave your personal information accessible to others. You're responsible if you choose to leave a computer unprotected while using this service. You should take your own precautions to ensure that the way you access this service does not expose you to the risk of:",
  precautions1: 'viruses',
  precautions2: 'malicious computer code',
  precautions3: 'other forms of interference which may damage your computer system',
  knowinglyIntroducing:
    'You must not misuse this service by knowingly introducing viruses, trojans, worms, logic bombs or other material which is malicious or technologically harmful. You must not attempt to gain unauthorised access to this service, the system on which it is stored, or any server, computer or database connected to it. You must not attack this site using a denial-of-service attack or a distributed denial-of-service attack.',
  personallySensitiveInformation: 'Entering personally sensitive information',
  containsSeveral:
    'This online service contains several free-text fields in which you may choose to enter information which is personally sensitive. If you enter information about your:',
  religiousBeliefs: 'religious beliefs',
  sexualOrientation: 'sexual orientation or sex life',
  racialOrigins: 'racial or ethnic origins',
  politicalOpinions: 'political opinions',
  philosophicalBeliefs: 'religious or philosophical beliefs',
  tradeMembership: 'trade union membership',
  geneticData: 'genetic data or biometric data',
  healthData: 'health data',
  consentGiven:
    'you give us your consent to processing this information for the purpose of dealing with your application. For more information about how we collect and store your personal data, see the <a class="govuk-link" href="/privacy-policy">privacy policy</a>.',
  disclaimer: 'Disclaimer',
  disclaimerGuarantee:
    "While we make every effort to keep information up to date, we don't provide any guarantees, conditions or warranties that it will be:",
  current: 'current',
  secure: 'secure',
  accurate: 'accurate',
  complete: 'complete',
  bugFree: 'free from bugs or viruses',
  advice:
    "We don't publish advice. You should get professional or specialist advice before doing anything on the basis of the information in the service. We're not liable for any loss or damage that may come from using this service. This includes:",
  losses: 'any direct, indirect or consequential losses',
  civilWrongs:
    "any loss or damage caused by civil wrongs ('tort', including negligence), breach of contract or otherwise",
  serviceUse: 'the use of this service, GOV.UK and any websites that are linked to or from it',
  inabilityToUse: 'the inability to use this service, GOV.UK and any websites that are linked to or from it',
  damageForeseeable:
    "This applies if the loss or damage was foreseeable, arose in the normal course of things or you advised us that it might happen. This includes (but isn't limited to) the loss of your:",
  income: 'income or revenue',
  salary: 'salary, benefits or other payments',
  business: 'business',
  profits: 'profits or contracts',
  opportunity: 'opportunity',
  anticipatedSavings: 'anticipated savings',
  data: 'data',
  goodwill: 'goodwill or reputation',
  tangibleProperty: 'tangible property',
  intangibleProperty: 'intangible property, including loss, corruption or damage to data or any computer system',
  wastedTime: 'wasted management or office time',
  liable: 'We may still be liable for:',
  death: 'death or personal injury arising from our negligence',
  fraudulentMisrepresentation: 'fraudulent misrepresentation',
  anyOtherLiability: 'any other liability which cannot be excluded or limited under applicable law',
  contactUsFurtherInfo: '<a class="govuk-link" href="/contact-us">Contact us</a> for further information.',
};

const cy: typeof en = {
  title: 'Telerau ac amodau',
  thisPage:
    'Trwy ddefnyddio’r gwasanaeth hwn rydych yn cytuno telerau defnyddio’r gwasanaeth hwn. Ar y wefan hon maent yn cynnwys <a class="govuk-link" href="/privacy-policy">polisi preifatrwydd</a>',
  termsAndConditionsUsers: 'Telerau ac amodau ar gyfer defnyddwyr proffesiynol',
  termsAndConditionsProfessional:
    'Os ydych yn ddefnyddiwr proffesiynol, bydd gofyn i chi gytuno â thelerau ac amodau ychwanegol y gwasanaeth ar ôl i chi greu cyfrif MyHMCTS.',
  whoWeAre: 'Pwy ydym ni',
  managedBy:
    'Rheolir y gwasanaeth hwn gan Wasanaeth Llysoedd a Thribiwnlysoedd Ei Mawrhydi a (chyfeirir at y gwasanaeth o hyn ymlaen fel ‘ni’). Dylech wirio’r telerau a’r amodau hyn yn rheolaidd. Gallwn eu diweddaru ar unrhyw adeg heb rybudd. Byddwch yn cytuno i unrhyw newidiadau os byddwch yn parhau i ddefnyddio’r gwasanaeth hwn ar ôl i’r telerau ac amodau gael eu diweddaru.',
  info: 'Gwybodaeth a ddarperir gan y gwasanaeth hwn',
  service:
    'Mae’r gwasanaeth hwn yn darparu gwybodaeth i’ch cefnogi. Ni allwn roi cyngor cyfreithiol ar achosion unigol. Dylech ateb y cwestiynau yn y gwasanaeth gan ystyried eich amgylchiadau a chael cyngor cyfreithiol os oes arnoch angen hynny.',
  stored: 'Rhannu a storio eich data',
  dataStored:
    "Mae ein <a class='govuk-link' href='/privacy-policy'>polisi preifatrwydd</a> yn esbonio ble mae eich data'n cael ei storio, a gyda phwy y caiff ei rannu. Mae ein polisi cwcis yn egluro sut mae’r gwasanaeth hwn yn defnyddio ac yn storio cwcis.",
  applicationLaw: 'Cyfreithiau sy’n berthnasol i’r gwasanaeth hwn',
  dispute:
    'Bydd y defnydd a wnewch o’r gwasanaeth hwn ac unrhyw anghydfod sy’n codi o’i ddefnyddio yn cael eu rheoli a’u dehongli yn unol â chyfreithiau Cymru a Lloegr, gan gynnwys, ond heb fod yn gyfyngedig i’r canlynol:',
  dispute1: 'Deddf Camddefnyddio Cyfrifiaduron 1990',
  dispute2: 'Deddf Diogelu Data 1998 (nes 25 Mai 2018)',
  dispute3: 'Deddf Diogelu Data 2018 (gan 25 Mai 2018)',
  dispute4: 'Rheoliadau Cyffredinol Diogelu Data',
  dispute5: 'Deddf Galluedd Meddyliol 2005',
  responsible: "Sut i ddefnyddio'r gwasanaeth hwn yn gyfrifol",
  risks:
    'Mae risgiau yn gysylltiedig â defnyddio cyfrifiadur sydd at ddefnydd y cyhoedd (er enghraifft, mewn caffi rhyngrwyd) i gael mynediad at y gwasanaeth hwn. Eich cyfrifoldeb chi yw bod yn ymwybodol o’r risgiau hyn ac osgoi defnyddio unrhyw gyfrifiadur lle mae posibilrwydd y gall eraill weld eich gwybodaeth bersonol. Chi sy’ n gyfrifol os ydych chi’n dewis gadael cyfrifiadur heb ei ddiogelu tra rydych wedi mewngofnodi i’r gwasanaeth hwn. Dylech ichi gymryd camau priodol eich hun i sicrhau nad yw’r ffordd rydych yn cael mynediad at y gwasanaeth hwn yn eich gadael yn agored i’r perygl o:',
  precautions1: 'firysau',
  precautions2: 'cod cyfrifiadur maleisus',
  precautions3: 'neu niwed o fath arall a allai achosi difrod i’ch system gyfrifiadurol',
  knowinglyIntroducing:
    "Ni ddylech gamddefnyddio'r gwasanaeth hwn drwy gyflwyno’n fwriadol firysau, ymwelwyr diwahoddiad, mwydod, bomiau rhesymeg neu unrhyw ddeunydd maleisus arall neu sy’n niweidiol i dechnoleg. Ni ddylech geisio cael mynediad heb awdurdod at y gwasanaeth hwn, y system lle caiff ei storio nac unrhyw weinydd, cyfrifiadur neu gronfa ddata sy’n gysylltiedig â’r gwasanaeth. Ni ddylech ymosod ar y wefan hon drwy ymosodiad atal gwasanaeth neu ymosodiad atal gwasanaeth a ddosbarthwyd.",
  personallySensitiveInformation: 'Nodi gwybodaeth bersonol sensitif',
  containsSeveral:
    'Mae’r gwasanaeth ar-lein hwn yn cynnwys nifer o feysydd testun rhydd lle’ch gwahoddir i nodi gwybodaeth bersonol sensitif. Os byddwch yn rhoi gwybodaeth am eich:',
  religiousBeliefs: 'credoau crefyddol',
  sexualOrientation: 'cyfeiriadedd rhywiol neu’ch bywyd rhywiol',
  racialOrigins: "tarddiad hiliol neu'ch tarddiad ethnig",
  politicalOpinions: 'barnau gwleidyddol',
  philosophicalBeliefs: 'credoau crefyddol neu athronyddol',
  tradeMembership: 'aelodaeth undeb llafur',
  geneticData: 'data genetig neu ddata biometrig',
  healthData: 'data am eich iechyd',
  consentGiven:
    "rydych yn rhoi caniatâd inni brosesu'r wybodaeth hon er mwyn inni allu ymdrin â’ch cais. I gael rhagor o wybodaeth am sut rydym yn casglu ac yn storio eich data personol, gweler y <a class='govuk-link' href='/privacy-policy'>polisi preifatrwydd</a>.",
  disclaimer: 'Ymwrthodiad',
  disclaimerGuarantee:
    'Er ein bod yn ymdrechu i gadw gwybodaeth yn gyfredol, nid ydym yn darparu unrhyw warantau, amodau neu sicrwydd y bydd:',
  current: 'yn gyfredol',
  secure: 'yn ddiogel',
  accurate: 'yn gywir',
  complete: 'yn gyflawn',
  bugFree: 'yn rhydd o fygiau neu firysau',
  advice:
    "Nid ydym yn cyhoeddi cyngor. Dylech gael cyngor proffesiynol neu arbenigol cyn gwneud unrhyw beth yn seiliedig ar y wybodaeth yn y gwasanaeth. Nid ydym yn atebol am unrhyw golled neu ddifrod a all ddeillio o ddefnyddio'r gwasanaeth hwn. Mae hyn yn cynnwys:",
  losses: 'unrhyw golledion uniongyrchol, anuniongyrchol neu ganlyniadol',
  civilWrongs:
    'unrhyw golled neu ddifrod a achoswyd gan gamweddau sifil (‘tort’, yn cynnwys esgeuluster), torri amodau contract neu',
  serviceUse: 'ddefnyddio’r gwasanaeth hwn fel arall, GOV.UK ac unrhyw wefannau sydd â dolenni i neu o’r wefan',
  inabilityToUse: 'methu â defnyddio’r gwasanaeth hwn, GOV.UK ac unrhyw wefannau sydd â dolenni i neu o’r wefan',
  damageForeseeable:
    'Mae hyn yn berthnasol os oedd y golled neu’r difrod yn rhagweladwy, wedi codi wrth i’r broses arferol fynd rhagddo, neu os oeddech wedi ein cynghori y gallai ddigwydd. Mae hyn yn cynnwys (ond nid yw’n gyfyngedig) i golli eich:',
  income: 'incwm neu refeniw',
  salary: 'cyflog, budd-daliadau neu daliadau eraill',
  business: 'busnes',
  profits: 'elw neu gontractau',
  opportunity: 'cyfleoedd',
  anticipatedSavings: 'cynilion a ragwelwyd',
  data: 'data',
  goodwill: 'ewyllys da neu’ch enw da',
  tangibleProperty: 'eiddo diriaethol',
  intangibleProperty:
    'eiddo anniriaethol, yn cynnwys colled, llygredd neu ddifrod i ddata neu unrhyw system gyfrifiadurol',
  wastedTime: 'gwastraff o amser rheolwyr neu amser swyddfa',
  liable: 'Efallai y byddwn yn parhau i fod yn atebol am:',
  death: 'farwolaeth neu anaf personol sy’n deillio o’n hesgeuluster',
  fraudulentMisrepresentation: 'camliwio twyllodrus',
  anyOtherLiability: 'unrhyw atebolrwydd arall na ellir ei eithrio neu ei gyfyngu dan y gyfraith berthnasol',
  contactUsFurtherInfo: '<a class="govuk-link" href="/contact-us">Cysylltwch â ni</a> am ragor o wybodaeth.',
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language];
};
