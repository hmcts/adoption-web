import { CaseWithId, Checkbox } from '../case/case';
import { ApplicationType, DivorceOrDissolution, JurisdictionConnections, YesOrNo } from '../case/definition';

type Who = 'applicant1' | 'applicant2';

const isHabituallyResident = (who: Who, data) => {
  return data[`${who}LifeBasedInEnglandAndWales`] === YesOrNo.YES;
};

const isDomiciled = (who: Who, data) => {
  return data[`${who}DomicileInEnglandWales`] === YesOrNo.YES;
};

const isHabituallyResidentForGivenTime = (who: Who, months, data) => {
  return data[`${who}LivingInEnglandWales${months}Months`] === YesOrNo.YES;
};

const areBothHabituallyResident = data => {
  return isHabituallyResident('applicant1', data) && isHabituallyResident('applicant2', data);
};

const onlyApplicant1HabituallyResident = data => {
  return isHabituallyResident('applicant1', data) && !isHabituallyResident('applicant2', data);
};

const onlyApplicant1HabituallyResidentInJointApplication = data => {
  return (
    isHabituallyResident('applicant1', data) &&
    !isHabituallyResident('applicant2', data) &&
    data['applicationType'] === ApplicationType.JOINT_APPLICATION
  );
};

const onlyApplicant2HabituallyResident = data => {
  return !isHabituallyResident('applicant1', data) && isHabituallyResident('applicant2', data);
};

const areBothLastHabituallyResident = data => {
  return data.bothLastHabituallyResident === YesOrNo.YES;
};

const isHabituallyResidentForTwelveMonths = data => {
  return isHabituallyResidentForGivenTime('applicant1', 'Twelve', data);
};

const isHabituallyResidentForSixMonths = data => {
  return isHabituallyResidentForGivenTime('applicant1', 'Six', data);
};

const areBothDomiciled = data => {
  return isDomiciled('applicant1', data) && isDomiciled('applicant2', data);
};

const isOnlyApplicant1Domiciled = data => {
  return isDomiciled('applicant1', data) && !isDomiciled('applicant2', data);
};

const isOnlyApplicant2Domiciled = data => {
  return !isDomiciled('applicant1', data) && isDomiciled('applicant2', data);
};

const onlyApplicant1Domiciled = data => {
  return isDomiciled('applicant1', data) && !isDomiciled('applicant2', data);
};

export const allowedToAnswerResidualJurisdiction = (data: Partial<CaseWithId>): boolean => {
  return (
    (data.sameSex === Checkbox.Checked || data.divorceOrDissolution === DivorceOrDissolution.DISSOLUTION) &&
    data.bothLastHabituallyResident === YesOrNo.NO &&
    !previousConnectionMadeUptoLastHabituallyResident(data)
  );
};

export const previousConnectionMadeUptoLastHabituallyResident = (data: Partial<CaseWithId>): boolean => {
  if (data.connections?.includes(JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT) && data.connections?.length > 1) {
    return true;
  } else {
    return !!(
      !data.connections?.includes(JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT) && data.connections?.length
    );
  }
};

const hasResidualJurisdiction = data => {
  return allowedToAnswerResidualJurisdiction(data) && data.jurisdictionResidualEligible === Checkbox.Checked;
};

export const addConnection = (data: Partial<CaseWithId>): JurisdictionConnections[] => {
  const connections: JurisdictionConnections[] = [];
  if (areBothHabituallyResident(data)) {
    connections.push(JurisdictionConnections.APP_1_APP_2_RESIDENT);
  }
  if (areBothLastHabituallyResident(data)) {
    connections.push(JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT);
  }
  if (onlyApplicant2HabituallyResident(data)) {
    connections.push(JurisdictionConnections.APP_2_RESIDENT);
  }
  if (onlyApplicant1HabituallyResidentInJointApplication(data)) {
    connections.push(JurisdictionConnections.APP_1_RESIDENT_JOINT);
  }
  if (isHabituallyResidentForTwelveMonths(data) && onlyApplicant1HabituallyResident(data)) {
    connections.push(JurisdictionConnections.APP_1_RESIDENT_TWELVE_MONTHS);
  }
  if (
    isHabituallyResidentForSixMonths(data) &&
    onlyApplicant1HabituallyResident(data) &&
    onlyApplicant1Domiciled(data)
  ) {
    connections.push(JurisdictionConnections.APP_1_RESIDENT_SIX_MONTHS);
  }
  if (areBothDomiciled(data)) {
    connections.push(JurisdictionConnections.APP_1_APP_2_DOMICILED);
  }
  if (hasResidualJurisdiction(data)) {
    connections.push(JurisdictionConnections.RESIDUAL_JURISDICTION);
  }
  if (isOnlyApplicant1Domiciled(data)) {
    connections.push(JurisdictionConnections.APP_1_DOMICILED);
  }
  if (isOnlyApplicant2Domiciled(data)) {
    connections.push(JurisdictionConnections.APP_2_DOMICILED);
  }
  return connections;
};
