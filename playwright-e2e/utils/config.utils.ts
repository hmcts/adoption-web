export interface CitizenCredentials {
  username: string;
  password: string;
}

export interface LACredentials {
  caseReferenceNumber: string;
  childName: string;
  dob: {
    day: string;
    montth: string;
    year: string;
  };
}

interface Urls {
  citizenURL: string;
  laUrl: string;
}

export interface Config {
  users: {
    citizen: CitizenCredentials;
    la: LACredentials;
  };
  urls: Urls;
}
