import { DetailWrapper } from './style';

import { DownOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Col, Popconfirm, Row, Tag, Tooltip, message } from 'antd';
import { Link, useParams } from 'react-router-dom';

import StyledBreadcrumb from 'components/layout/breadcrumb';

import { IClient, IClientReq } from 'services/api/client/types';
import { useClientDetail, useClientStatus } from 'services/hooks/client';
import { clientKeys } from 'services/hooks/queryKeys';

import { IApiError } from 'utils/Types';
import { EmployeeStatus } from 'utils/constants/enum';
import { ROUTES } from 'utils/constants/routes';
import { renderTagColor } from 'utils/renderColor';

const BreadcrumbsPath = [
  {
    title: <Link to={ROUTES.clientManagement}>Client</Link>
  },
  {
    title: 'Client Detail'
  }
];

const ViewClient = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: clientData } = useClientDetail(Number(id));
  const { mutate } = useClientStatus();

  const handleConfirm = () => {
    const data = {
      status:
        clientData?.status === EmployeeStatus.Active
          ? EmployeeStatus.Inactive
          : EmployeeStatus.Active,
      clientId: Number(id)
    };

    mutate(data, {
      onSuccess: (res) => {
        // invalidate client list
        queryClient.invalidateQueries({
          predicate: (query) => {
            return [clientKeys.clientList({} as IClientReq)].some((key) => {
              return ((query.options.queryKey?.[0] as string) ?? query.options.queryKey)?.includes(
                key[0]
              );
            });
          }
        });

        // set status in client detail
        queryClient.setQueryData<IClient>(clientKeys.clientDetail(Number(id)), () => {
          return { ...res } as unknown as IClient;
        });
      },
      onError: (err: IApiError) => {
        message.error(err.message);
      }
    });
  };

  return (
    <>
      <StyledBreadcrumb items={BreadcrumbsPath}></StyledBreadcrumb>
      <div className="shadow-paper">
        <div className="pageHeader">
          <h2 className="pageTitle">Client Detail</h2>
          <Popconfirm
            title="Status"
            placement="bottomLeft"
            description={`Are you sure to ${
              clientData?.status === EmployeeStatus.Active
                ? EmployeeStatus.Inactive
                : EmployeeStatus.Active
            } this client?`}
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleConfirm()}
          >
            <Tag
              color={renderTagColor(
                clientData?.status === EmployeeStatus.Active ? 'Active' : 'Inactive'
              )}
            >
              {clientData?.status === EmployeeStatus.Active ? 'Active' : 'Inactive'}{' '}
              <DownOutlined />
            </Tag>
          </Popconfirm>
        </div>
        <DetailWrapper>
          <Row className="clientRow">
            <Col xs={6}>
              <h4>First Name</h4>
              <p>{clientData?.firstName ?? '-'}</p>
            </Col>
            <Col xs={6}>
              <h4>Last Name</h4>
              <p>{clientData?.lastName ?? '-'}</p>
            </Col>
            <Col xs={6}>
              <h4>Email</h4>
              <p>{clientData?.email ?? '-'}</p>
            </Col>
          </Row>
          <Row className="clientRow">
            <Col xs={6}>
              <h4>Phone</h4>
              <p>{clientData?.phone ?? '-'}</p>
            </Col>
            <Col xs={6}>
              <h4>Gender</h4>
              <p>{clientData?.gender ?? '-'}</p>
            </Col>
            <Col xs={6}>
              <h4>Address</h4>
              <p>{clientData?.address ?? '-'}</p>
            </Col>
          </Row>
          <Row className="clientRow">
            <Col xs={6}>
              <h4>Country</h4>
              <p>{clientData?.countryName ?? '-'}</p>
            </Col>
            <Col xs={6}>
              <h4>State</h4>
              <p>{clientData?.stateName ?? '-'}</p>
            </Col>
            <Col xs={6}>
              <h4>City</h4>
              <p>{clientData?.cityName ?? '-'}</p>
            </Col>
          </Row>
          <Row className="clientRow">
            <Col xs={6}>
              <h4>Company Name</h4>
              <p>{clientData?.company?.name ?? '-'}</p>
            </Col>
            <Col xs={6}>
              <h4>Client Company Name</h4>
              <p>{clientData?.clientCompanyName ?? '-'}</p>
            </Col>
            <Col xs={6}>
              <h4>No. of Projects</h4>
              <Tooltip
                title={
                  clientData?.projects?.length ? (
                    <div>
                      {clientData.projects.map((project, index) => (
                        <div key={index}>{project.name}</div>
                      ))}
                    </div>
                  ) : (
                    'No projects available'
                  )
                }
                placement="left"
                trigger="hover"
              >
                <p>{clientData?.projects?.length ?? '-'}</p>
              </Tooltip>
            </Col>
          </Row>
          <Row className="clientRow">
            <Col xs={6}>
              <h4>Account Manager</h4>
              <p>{clientData?.accountManager ?? '-'}</p>
            </Col>
            <Col xs={6}>
              <h4>Website</h4>
              <p>{clientData?.website ?? '-'}</p>
            </Col>
            <Col xs={6}></Col>
          </Row>
        </DetailWrapper>
      </div>
    </>
  );
};

export default ViewClient;
