import moment from 'moment';
import { apiData } from '../../../axiosApiRequest';
import { dbRef } from '../../../firebaseConfig';
import { ADD_FORM_TEXT, EDIT_FORM_TEXT, DELETE_FORM_TEXT, USERNAME_DOMAIN } from '../../../commons/globalText';
import { getHospitalByIdAction } from '../../Hospital/actions/HospitalActions';
import { isEmpty } from '../../../helpers/utils';
import getNomenclator from '../../../services/nomenclators';
import { getRoleById } from '../../../services/roles';

const profilesRef = dbRef('profile').collection('profiles');

export const getProfileByIdAction = async (id, fields = []) => {
  const ref = await profilesRef.doc(id).get();
  const data = fields.map(k => ({ [k]: ref.data()[k] })).reduce((a, b) => ({ ...a, ...b }), {});
  return { id: ref.id, ...(isEmpty(fields) ? ref.data() : data) };
};

const mutateValues = async ({ birthday, doctor, role, hospital, sex, sname = '', secondaryPhone = '' }) => ({
  sname,
  secondaryPhone,
  ...(birthday ? { birthday: moment(birthday).toDate() } : {}),
  ...(birthday ? { birthday: moment(birthday).toDate() } : {}),
  ...(doctor ? { doctor: await getProfileByIdAction(doctor, ['fullname']) } : {}),
  ...(role ? { role: await getRoleById(role) } : {}),
  ...(hospital ? { hospital: await getHospitalByIdAction(hospital, ['name']) } : {}),
  ...(sex ? { sex: await getNomenclator('sex', sex) } : {})
});

const addValuesAction = async ({ id, email, password, username, ...values }) => {
  const mutations = await mutateValues(values);
  const result = { ...values, ...mutations };
  const response = await apiData.post('/createUser', {
    username: `${username}${USERNAME_DOMAIN}`,
    password,
    fullname: `${values.name} ${values.lastName}`
  });
  const { user } = response.data;
  await profilesRef.doc(user.uid).set({
    ...result,
    email,
    username,
    user,
    createdAt: Date.now()
  });
};

const editValuesAction = async ({ id, email, ...values }) => {
  const result = { ...values, ...(await mutateValues(values)) };
  await profilesRef.doc(id).update({
    ...result,
    updatedAt: Date.now()
  });
};

const deleteValuesAction = async ({ id }) => {
  await apiData.post('/deleteUser', { userId: id });
  await profilesRef.doc(id).delete();
};

export const saveProfileValuesAction = async (values, formType) => {
  if (formType === ADD_FORM_TEXT) {
    await addValuesAction(values);
  }
  if (formType === EDIT_FORM_TEXT) {
    await editValuesAction(values);
  }
  if (formType === DELETE_FORM_TEXT) {
    await deleteValuesAction(values);
  }
  return Promise;
};
