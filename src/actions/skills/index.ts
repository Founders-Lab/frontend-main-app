import {
  ADD_PROFILE_NORMALIZE_SKILL,
  FILL_PROFILE_SKILLS,
  FILL_SKILLS,
} from './types';

export interface ISkills {
  skillsId: number;
  name: string;
}

export interface INormalizeSkills {
  label: string;
  value: number;
}

export const fillSkillsData = (skills: INormalizeSkills[]) => ({
  type: FILL_SKILLS,
  skills,
});

export const fillProfileSkillsData = (skills: INormalizeSkills[]) => ({
  type: FILL_PROFILE_SKILLS,
  skills,
});

export const addProfileNormalizeSkill = (skill: INormalizeSkills) => ({
  type: ADD_PROFILE_NORMALIZE_SKILL,
  skill,
});
