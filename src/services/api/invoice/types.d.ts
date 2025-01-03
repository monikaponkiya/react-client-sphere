import { Key } from 'react';

import { IClient } from '../client/types';
import { ICompany } from '../company/types';
import { ICr } from '../cr/types';
import { IEmployee } from '../employee/types';
import { IProject } from '../project/types';

interface IInvoice {
  id: number;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  companyId: number;
  company: ICompany;
  clientId: number;
  client: IClient;
  projectId: number;
  project: IProject;
  crIds: number[];
  crs: ICr[];
  amount: number;
  additionalAmount: number;
  additionalChargeDesc: string;
  additionalDiscountAmount: number;
  isPaymentReceived: boolean;
  paidAmount: number;
  markAsPaid: boolean;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface IInvoiceReq {
  limit: number;
  offset: number;
  search?: string;
  sortOrder?: Key;
  sortBy?: Key;
  deletedInvoice?: boolean;
  clientId?: number;
  projectId?: number;
  invoiceNumber?: string;
  invoiceDate?: string;
}

export interface IAddInvoiceReq {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  companyId: number;
  clientId: number;
  projectId: number;
  crIds: number[];
  amount: number;
  additionalAmount: number;
  additionalChargeDesc: string;
  additionalDiscountAmount: number;
  isUpdateCrAmount: boolean;
  crInvoiceAmount: ICrInvoiceAmt[];
}

export interface IInvoiceRes {
  result: IInvoice[];
  recordsTotal: number;
}

export interface IAddInvoiceRes {}

export interface IEditInvoiceReq extends IAddInvoiceReq {
  id: number;
}

export interface IInvoiceAmount {
  id: number;
  invoicedCost: number;
}
