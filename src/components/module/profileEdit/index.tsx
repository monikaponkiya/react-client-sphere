import { useQueryClient } from '@tanstack/react-query';
import { Button, Form, Row, message } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { RenderPhoneNumber, RenderTextInput } from 'components/common/FormField';
import StyledBreadcrumb from 'components/layout/breadcrumb';

import { IProfileEditReq } from 'services/api/profile/types';
import { useProfileDetail, useProfileEdit } from 'services/hooks/profile';
import { profileKey } from 'services/hooks/queryKeys';
import { authStore } from 'services/store/auth';

import { IApiError } from 'utils/Types';
import { ROUTES } from 'utils/constants/routes';

const EditProfile = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { actions, employeeData } = authStore.getState();
  const { data } = useProfileDetail();
  const { mutate } = useProfileEdit();
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (!data) return;
    form.setFieldsValue({
      ['firstName']: data?.firstName ?? '',
      ['lastName']: data?.lastName ?? '',
      ['middleName']: data?.middleName ?? '',
      ['personalEmail']: data?.personalEmail ?? '',
      ['companyEmail']: data?.companyEmail ?? '',
      ['phone']: data?.phone ?? ''
    });
  }, [form, data]);

  const onSubmit = (value: any) => {
    const editData: IProfileEditReq = {
      id: data?.id ?? 0,
      email: value?.email,
      firstName: value?.firstName,
      lastName: value?.lastName,
      middleName: value?.middleName
    };

    mutate(editData, {
      onSuccess: (res) => {
        navigate(ROUTES.myProfile);
        queryClient.invalidateQueries(profileKey.profileDetail);
        actions.authSuccess({
          data: { ...employeeData, ...res, access_token: employeeData?.access_token }
        });
      },
      onError: (err: IApiError) => {
        message.error(err?.message);
      }
    });
  };

  const BreadcrumbsPath = [
    {
      title: <Link to={ROUTES.myProfile}>My Profile</Link>
    },
    {
      title: 'Edit Profile'
    }
  ];
  return (
    <>
      <StyledBreadcrumb items={BreadcrumbsPath}></StyledBreadcrumb>
      <div className="shadow-paper">
        <div className="pageHeader">
          <h2 className="pageTitle">Edit Profile</h2>
        </div>

        <Form onFinish={onSubmit} form={form} autoComplete="off" className="signInForm">
          <Row gutter={[0, 30]}>
            <RenderTextInput
              col={{ xs: 12 }}
              name="firstName"
              placeholder="Enter first name"
              label="First Name"
              allowClear="allowClear"
              size="middle"
              rules={[
                {
                  required: true,
                  message: 'Please enter first name'
                }
              ]}
            />
            <RenderTextInput
              col={{ xs: 12 }}
              name="middleName"
              placeholder="Enter middle name"
              label="Middle Name"
              allowClear="allowClear"
              size="middle"
              rules={[
                {
                  required: true,
                  message: 'Please enter middle name'
                }
              ]}
            />
            <RenderTextInput
              col={{ xs: 12 }}
              name="lastName"
              placeholder="Enter last name"
              label="Last Name"
              allowClear="allowClear"
              size="middle"
              rules={[
                {
                  required: true,
                  message: 'Please enter last name'
                }
              ]}
            />
            <RenderTextInput
              col={{ xs: 12 }}
              name="personalEmail"
              placeholder="Enter personal email address"
              label="Personal Email"
              allowClear="allowClear"
              size="middle"
              disabled={true}
              rules={[
                {
                  required: true,
                  message: 'Please enter personal email address'
                }
              ]}
            />
            <RenderTextInput
              col={{ xs: 12 }}
              name="companyEmail"
              placeholder="Enter company email address"
              label="Company Email"
              allowClear="allowClear"
              size="middle"
              disabled={true}
              rules={[
                {
                  required: true,
                  message: 'Please enter company email address'
                }
              ]}
            />
            <RenderPhoneNumber
              col={{ xs: 12 }}
              name="phone"
              placeholder="Enter phone number "
              label="Phone Number"
              onChange={(value: any) => setValue(value)}
              value={value}
              rules={[
                {
                  required: true,
                  message: 'Please enter phone number'
                }
              ]}
            />
          </Row>

          <Row justify={'center'} gutter={[0, 30]}>
            <Button className="mt-20" type="primary" size="middle" htmlType="submit">
              Submit
            </Button>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default EditProfile;
