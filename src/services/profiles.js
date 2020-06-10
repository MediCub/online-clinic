import moment from 'moment';
import { retriveData, retriveDoc } from './utils';

const mutateToClient = ({ birthday, ...rest }) => {
  let bt;
  if (moment(birthday).isValid()) {
    bt = moment(birthday);
  } else if (moment(birthday.toDate()).isValid()) {
    bt = moment(birthday.toDate());
  }
  return { ...rest, ...(birthday ? { birthday: bt } : {}) };
};

const getProfiles = async (limit, offset, filters, sort = true) => {
  try {
    const response = await retriveData(
      'profiles',
      limit,
      offset,
      filters,
      sort ? 'fullname' : undefined,
      sort ? 'asc' : undefined
    );
    return { ...response, data: response.data.map(profile => mutateToClient(profile)) };
  } catch (e) {
    throw new Error(e);
  }
};

export const getProfileById = async id => {
  try {
    const response = await retriveDoc(`profiles/${id}`);
    if (response) {
      return mutateToClient(response);
    }
    return null;
  } catch (e) {
    throw new Error(e);
  }
};

export default getProfiles;
