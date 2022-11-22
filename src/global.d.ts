interface Invoice {
  id: string;
  invoiceStatus: InvoiceStatus;
  issueDate: string;
  invoiceNumber: string;
  client: Client;
  dueDate: string;
  subject?: string;
  lineItems?: LineItem[];
  notes?: string;
  terms?: string;
  createdAt: string;
}

interface Client {
  id: string;
  clientStatus: ClientStatus;
  name: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  amount: number;
}
