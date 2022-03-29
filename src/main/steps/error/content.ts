import { StatusCodes } from 'http-status-codes';

const en = {
  [StatusCodes.BAD_REQUEST]: {
    title: 'Bad request',
  },
  [StatusCodes.NOT_FOUND]: {
    title: 'Page not found',
    line1: 'If you typed the web address into the URL bar, check that it is correct.',
    line2: 'If you pasted the web address, check you copied the entire address.',
    line3:
      'If you followed a link, there may be a problem with the service or the link has timed out. You should ask for a new link.',
    line4: 'If you need support for the online adoption service, contact your social worker or adoption agency.',
  },
  [StatusCodes.INTERNAL_SERVER_ERROR]: {
    title: 'Sorry, there is a problem with the online adoption service',
    info: 'Please try again later. We have saved your answers.',
  },
};

const cy: typeof en = {
  [StatusCodes.BAD_REQUEST]: {
    title: 'Cais gwael',
  },
  [StatusCodes.NOT_FOUND]: {
    title: 'Ni ellir dod o hyd i’r dudalen',
    line1: 'If you typed the web address into the URL bar, check that it is correct. (in welsh)',
    line2: 'If you pasted the web address, check you copied the entire address. (in welsh)',
    line3:
      'If you followed a link, there may be a problem with the service or the link has timed out. You should ask for a new link. (in welsh)',
    line4:
      'If you need support for the online adoption service, contact your social worker or adoption agency. (in welsh)',
  },
  [StatusCodes.INTERNAL_SERVER_ERROR]: {
    title: 'Yn anffodus, rydym yn cael problemau technegol',
    info: 'Rhowch gynnig arall arni ymhen ychydig funudau',
  },
};

export const errorContent = { en, cy };
