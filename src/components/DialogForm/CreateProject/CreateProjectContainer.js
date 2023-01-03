import React from 'react';
import PropTypes from 'prop-types';
import CreateProject from './CreateProject';
import * as Yup from 'yup';
import { useAddProjectMutation, useUpdateProjectMutation } from 'store/API/projectApi';
import { Loader } from 'components';
import i18n from 'i18next';
import AlertMessage from 'utils/AlertMessage';
import ResponseHandler from 'utils/ResponseHandler';

const ProjectCreateSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, i18n.t('error.project_name_too_short'))
    .max(250, i18n.t('error.max_allow_two_fifty_character'))
    .required(i18n.t('error.project_name_is_required')),
  owners: Yup.array().min(1, i18n.t('error.owner_is_required')).required(),
  description: Yup.string().max(1000, 'description has to be grater than 1000 characters!')
});
const CreateProjectContainer = ({
  initialValues,
  formType,
  type,
  id,
  close,
  users,
  setDefaultPagination
}) => {
  const [addProject, { isLoading: addLoading }] = useAddProjectMutation();
  const [updateProject, { isLoading: updateLoading }] = useUpdateProjectMutation();

  const usersOptions = users?.map((item) => {
    return {
      label: `${item?.displayName} (${item?.email})`,
      value: item.userID,
      Image: 'https://via.placeholder.com/150'
    };
  });
  const SubmitProject = async (value) => {
    try {
      const projectInfo = type === 'edit' ? await updateProject(value) : await addProject(value);
      if (projectInfo?.data && projectInfo?.data?.status) {
        setDefaultPagination();
      }
      ResponseHandler(projectInfo, close);
    } catch (error) {
      AlertMessage(error, 'error');
    }
  };

  return (
    <>
      <CreateProject
        validationSchema={ProjectCreateSchema}
        initialValues={initialValues}
        submitProject={SubmitProject}
        formType={formType}
        type={type}
        id={id}
        users={usersOptions}
      />
      {(addLoading || updateLoading) && <Loader />}
    </>
  );
};

CreateProjectContainer.propTypes = {
  initialValues: PropTypes.any,
  formType: PropTypes.any,
  type: PropTypes.any,
  id: PropTypes.any,
  submitProject: PropTypes.any,
  close: PropTypes.func,
  setDefaultPagination: PropTypes.func,
  users: PropTypes.array
};
CreateProjectContainer.defaultProps = {
  setDefaultPagination: () => {}
};
export default CreateProjectContainer;
