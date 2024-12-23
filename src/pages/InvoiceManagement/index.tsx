import { Wrapper } from './style';

import { SearchOutlined } from '@ant-design/icons';
import { Button, Form, Select } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useDebounce from '../../components/common/useDebounce';
import { RenderTextInput } from 'components/common/FormField';
import StyledBreadcrumb from 'components/layout/breadcrumb';
import InvoiceManagementTable from 'components/module/invoiceManagement/InvoiceManagementTable';

import { IInvoiceReq } from 'services/api/invoice/types';

import { ROUTES } from 'utils/constants/routes';

const BreadcrumbsPath = [
  {
    title: 'Invoices'
  }
];

const InvoiceManagement = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>('');
  const [deletedInvoice, setDeletedInvoice] = useState<boolean>(false);

  const searchDebounce = useDebounce(searchValue);
  const [args, setArgs] = useState<IInvoiceReq>({
    limit: 10,
    offset: 0,
    sortBy: '',
    sortOrder: '',
    deletedInvoice
  });

  const handleChange = (value: string) => {
    const deleted = value === 'deleted';
    setDeletedInvoice(deleted);
    setArgs((prev) => ({
      ...prev,
      deletedInvoice: deleted,
      offset: 0
    }));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setArgs((prev) => ({ ...prev, offset: 0 }));
  };

  return (
    <Wrapper>
      <StyledBreadcrumb items={BreadcrumbsPath}></StyledBreadcrumb>
      <div className="shadow-paper">
        <div className="pageHeader">
          <h2 className="pageTitle">Invoices</h2>
          <div className="pageHeaderButton">
            <Form form={form}>
              <RenderTextInput
                size="middle"
                placeholder="Search invoice"
                allowClear
                prefix={<SearchOutlined style={{ color: '#0000ff' }} />}
                onChange={onChange}
              />
            </Form>
            <Select defaultValue="all" style={{ width: 120 }} onChange={handleChange}>
              <Select.Option value="all">All Invoices</Select.Option>
              <Select.Option value="deleted">Deleted Invoices</Select.Option>
            </Select>
            <Button type="primary" onClick={() => navigate(ROUTES.invoiceAdd)}>
              Add Invoice
            </Button>
          </div>
        </div>
        <InvoiceManagementTable searchDebounce={searchDebounce} args={args} setArgs={setArgs} />
      </div>
    </Wrapper>
  );
};

export default InvoiceManagement;
