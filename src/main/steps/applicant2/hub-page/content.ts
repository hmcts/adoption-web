import { TranslationFn } from '../../../app/controller/GetController';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/hub-page/content';

export const form = applicant1Form;

export const generateContent: TranslationFn = content => {
  return applicant1GenerateContent(content);
};
