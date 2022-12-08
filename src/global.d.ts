interface Invoice {
  id: string;
  client: Client;
  invoiceStatus: InvoiceStatus;
  issueDate: string;
  invoiceNumber: string;
  dueDate: string;
  subject?: string;
  lineItems?: LineItem[];
  discount?: number;
  notes?: string;
  terms?: string;
  createdAt: string;
}

interface Client {
  id: string;
  clientStatus?: ClientStatus;
  name: string;
  email: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  invoices?: Invoice[];
}

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  amount: number;
}

interface Settings {
  myName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

type NotificationType = "success" | "error" | "info" | "warning";
interface Snackbar{
  id: string;
  message: string;
  type: NotificationType;
}
