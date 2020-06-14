import React, { createContext, useContext, useReducer, useState, useEffect, useRef, useCallback } from 'react';
import { GlobalReducer, initialGlobalState } from '../../commons/actions/GlobalReducers';
import { isEmpty } from '../../helpers/utils';
import { useCustomPaginationContext } from '../pagination/PaginationContext';
import { saveMedicineValuesActions } from './actions/MedicinesActions';
import getMedicines from '../../services/medicines';
import setModalVisibleAction from '../../commons/actions/GlobalActions';

const MedicinesContext = createContext({});

export const MedicinesContextProvider = ({ children }) => {
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [loadingList, setLoadingList] = useState(false);
  const [selected, setSelected] = useState(null);
  const [action, setAction] = useState('fetch');
  const [params, setParams] = useState({});
  const { page, pageSize, resetPagination } = useCustomPaginationContext();
  const [globalState, globalDispatch] = useReducer(GlobalReducer, initialGlobalState, init => init);
  const mounted = useRef(true);

  const fetchList = useCallback(async (limit, pag, filters) => {
    setLoadingList(true);
    const result = await getMedicines(limit, pag, filters);
    if (mounted.current) {
      setList(result.data);
      setTotal(result.total);
    }
    setLoadingList(false);
  }, []);

  useEffect(() => {
    mounted.current = true;
    if (!isEmpty(params)) {
      fetchList(pageSize, page, params);
      setAction('');
    }

    return () => {
      mounted.current = false;
    };
  }, [pageSize, page, params, fetchList, action, setAction]);

  const setSelectedFromList = useCallback(
    id => {
      const element = list.find(a => a.id === id) || null;
      setSelected(element);
    },
    [list]
  );

  const saveValues = useCallback(async (values, formType) => {
    await saveMedicineValuesActions(values, formType);
    setAction('fetch');
  }, []);

  const setModalVisible = useCallback((flag, formType) => {
    globalDispatch(setModalVisibleAction(flag, formType));
  }, []);

  return (
    <MedicinesContext.Provider
      value={{
        list,
        total,
        params,
        selected,
        setSelectedFromList,
        resetPagination,
        loadingList,
        ...globalState,
        saveValues,
        setModalVisible,
        setParams
      }}
    >
      {children}
    </MedicinesContext.Provider>
  );
};

export const useMedicinesContext = () => {
  const values = useContext(MedicinesContext);
  return {
    list: values.list,
    total: values.total,
    params: values.params,
    selected: values.selected,
    setSelectedFromList: values.setSelectedFromList,
    resetPagination: values.resetPagination,
    loadingList: values.loadingList,
    formType: values.formType,
    modalVisible: values.modalVisible,
    setModalVisible: values.setModalVisible,
    saveValues: values.saveValues,
    setParams: values.setParams
  };
};
