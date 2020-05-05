import React, { createContext, useCallback, useContext, useMemo, useReducer, useState } from 'react';
import { GlobalReducer, initialGlobalState } from '../../commons/reducers/GlobalReducers';
import setModalVisibleAction from '../../commons/reducers/GlobalActions';
import { getListTreatmentsAction, saveValuesAction } from './reducers/TreatmentActions';

const TreatmentsContext = createContext({});

export const withTreatmentsContext = WrapperComponent => () => {
  const [list, setList] = useState([]);
  const [slected, setSelected] = useState(null);
  const [loadingList, setLoadingList] = useState(false);
  const [globalState, globalDispatch] = useReducer(GlobalReducer, initialGlobalState, init => init);
  const selected = useMemo(() => slected, [slected]);
  const listTreatments = useMemo(() => list, [list]);

  const getListOfTreatments = useCallback(async params => {
    setLoadingList(true);
    try {
      const result = await getListTreatmentsAction(params);
      setList(result);
    } catch (e) {
      // handle errors
    } finally {
      setLoadingList(false);
    }
  }, []);

  const selectFromList = useCallback(
    id => {
      const result = listTreatments.find(item => item.id === id) || null;
      setSelected(result);
    },
    [listTreatments]
  );

  const saveValues = useCallback(async (values, formType) => {
    await saveValuesAction(values, formType);
  }, []);

  const setModalVisible = useCallback((flag, formType) => {
    globalDispatch(setModalVisibleAction(flag, formType));
  }, []);

  return (
    <TreatmentsContext.Provider
      value={{
        listTreatments,
        selected,
        loadingList,
        ...globalState,
        getListOfTreatments,
        selectFromList,
        saveValues,
        setModalVisible,
      }}
    >
      <WrapperComponent />
    </TreatmentsContext.Provider>
  );
};

export const useTreatmentsContext = () => {
  const values = useContext(TreatmentsContext);
  if (!values) throw new Error('Only works inside TreatmentsContextProvider');

  return {
    listTreatments: values.listTreatments,
    selected: values.selected,
    loadingList: values.loadingList,
    formType: values.formType,
    modalVisible: values.modalVisible,
    getListOfTreatments: values.getListOfTreatments,
    selectFromList: values.selectFromList,
    saveValues: values.saveValues,
    setModalVisible: values.setModalVisible,
  };
};
