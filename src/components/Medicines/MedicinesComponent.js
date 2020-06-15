import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import ModalComponent from '../ModalComponent';
import medicineHeadCells from './medicineHeadCells';
import RowListMedicineComponent from './RowListMedicineComponent';
import TableComponent from '../table/TableComponent';
import { useAuthContext } from '../../contexts/AuthContext';
import { withCustomPaginationContext } from '../pagination/PaginationContext';
import PaginationComponent from '../pagination/PaginationComponent';
import { getPropValue } from '../../helpers/utils';
import { ADD_FORM_TEXT, EDIT_FORM_TEXT, DELETE_FORM_TEXT, DETAILS_FORM_TEXT } from '../../commons/globalText';
import AddOrEditMedicineComponent from './forms/AddOrEditMedicineComponent';
import DeleteMedicineComponent from './forms/DeleteMedicineComponent';
import DetailsMedicineComponent from './forms/DetailsMedicineComponent';
import InputSearchByTagname from '../filters/InputSearchByTagName';
import { useMedicinesContext, MedicinesContextProvider } from './MedicinesContext';

function SimpleMedicinesComponent() {
  const { currentUserProfile } = useAuthContext();
  const {
    list,
    loadingList,
    setSelectedFromList,
    selected,
    modalVisible,
    setModalVisible,
    saveValues,
    formType,
    setParams,
    params,
    total,
    resetPagination
  } = useMedicinesContext();

  useEffect(() => {
    resetPagination();
  }, [params, resetPagination]);

  useEffect(() => {
    setParams({ clinic: getPropValue(currentUserProfile, 'parent') });
  }, [currentUserProfile, setParams]);

  const handleModalVisible = fType => {
    setModalVisible(true, fType);
  };

  return (
    <>
      <ModalComponent visible={modalVisible}>
        {([ADD_FORM_TEXT, EDIT_FORM_TEXT].includes(formType) && (
          <AddOrEditMedicineComponent
            title={`${
              (formType === ADD_FORM_TEXT && 'Adicionar') || (formType === EDIT_FORM_TEXT && 'Editar')
            } medicamento`}
            setModalVisible={setModalVisible}
            selected={selected}
            formType={formType}
            saveMedicineValues={saveValues}
            clinic={currentUserProfile.parent}
          />
        )) ||
          (formType === DELETE_FORM_TEXT && (
            <DeleteMedicineComponent
              selected={selected}
              formType={formType}
              saveMedicineValues={saveValues}
              setModalVisible={setModalVisible}
            />
          )) ||
          (formType === DETAILS_FORM_TEXT && (
            <DetailsMedicineComponent setModalVisible={setModalVisible} selected={selected} />
          )) ||
          null}
      </ModalComponent>
      <TableComponent
        title="Listado de medicamentos"
        extraText={
          <Typography>
            <strong>Total: </strong>({total})
          </Typography>
        }
        filters={<InputSearchByTagname setParams={setParams} params={params} tagName="name" />}
        headCells={medicineHeadCells}
        list={list}
        loadingList={loadingList}
        setModalVisible={setModalVisible}
        selected={selected}
        addRole
        render={(row, index) => (
          <RowListMedicineComponent
            key={row.id}
            row={row}
            index={index}
            selectRow={setSelectedFromList}
            selected={selected}
            onModalVisible={handleModalVisible}
          />
        )}
      />
      <PaginationComponent total={total} />
    </>
  );
}

const MedicinesComponent = withCustomPaginationContext(() => {
  return (
    <MedicinesContextProvider>
      <SimpleMedicinesComponent />
    </MedicinesContextProvider>
  );
});

export default MedicinesComponent;
