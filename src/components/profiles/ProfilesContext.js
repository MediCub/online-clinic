import React, { createContext, useCallback, useContext, useReducer } from 'react';
import { isEmpty } from 'ramda';
import { initialProfilesState, ProfilesReducer } from './reducers/ProfileReducer';
import { GlobalReducer, initialGlobalState } from '../../commons/reducers/GlobalReducers';
import {
  getDoctorsNomencladorAction,
  getProfilesAction,
  saveProfileValuesAction,
  setListProfilesAction,
  setProfileListLoadingAction,
  setProfileSelected,
} from './reducers/ProfileActions';
import setModalVisibleAction from '../../commons/reducers/GlobalActions';
import { initialProfileFiltersState, ProfileFiltersReducer } from './reducers/ProfileFiltersReducer';
import setProfileFilterAction from './reducers/ProfilesFiltersActions';

const ProfilesContext = createContext({});

export const withProfileContext = WrapperComponent => () => {
  const [state, dispatch] = useReducer(ProfilesReducer, initialProfilesState, init => init);
  const [filtersState, filtersDispatch] = useReducer(ProfileFiltersReducer, initialProfileFiltersState, init => init);
  const [globalState, globalDispatch] = useReducer(GlobalReducer, initialGlobalState, init => init);

  // eslint-disable-next-line no-unused-vars
  const getProfilesList = useCallback(async params => {
    dispatch(setProfileListLoadingAction(true));
    try {
      const result = await getProfilesAction(params);
      dispatch(setListProfilesAction(result));
    } catch (e) {
      // handle error
    }
    dispatch(setProfileListLoadingAction(false));
  }, []);

  const saveProfileValues = useCallback(async (values, formType) => {
    try {
      await saveProfileValuesAction(values, formType);
    } catch (e) {
      // handle error
    }
  }, []);

  const selectProfileFromList = useCallback(selected => dispatch(setProfileSelected(selected)), []);

  const setModalVisible = useCallback(
    (visible, formType) => globalDispatch(setModalVisibleAction(visible, formType)),
    []
  );

  const getDoctorsNomenclador = useCallback(async params => {
    const result = await getProfilesAction(params);
    dispatch(getDoctorsNomencladorAction(result));
  }, []);

  const setProfileFilter = useCallback(filters => filtersDispatch(setProfileFilterAction(filters)), []);

  return (
    <ProfilesContext.Provider
      value={{
        ...state,
        ...globalState,
        ...filtersState,
        getProfilesList,
        selectProfileFromList,
        saveProfileValues,
        setModalVisible,
        setProfileFilter,
        getDoctorsNomenclador,
      }}
    >
      <WrapperComponent />
    </ProfilesContext.Provider>
  );
};

export const useProfilesContext = () => {
  const values = useContext(ProfilesContext);
  if (!values || isEmpty(values)) throw new Error('This context only works inside ProfilesContextProvider');
  return {
    profiles: values.profiles,
    total: values.total,
    profileSelected: values.profileSelected,
    loadingList: values.loadingList,
    formType: values.formType,
    modalVisible: values.modalVisible,
    getProfilesList: values.getProfilesList,
    selectProfileFromList: values.selectProfileFromList,
    saveProfileValues: values.saveProfileValues,
    setModalVisible: values.setModalVisible,
    doctorsNomenclador: values.doctorsNomenclador,
    getDoctorsNomenclador: values.getDoctorsNomenclador,
    filters: values.filters,
    setProfileFilter: values.setProfileFilter,
  };
};
