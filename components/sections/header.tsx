import { getContactOptions } from "@/lib/services/contact";
import { HeaderClient } from "./header-client";

export default async function Header() {
  const [contacts] = await Promise.all([
    getContactOptions(),
  ]);

  const employeeContact = contacts.find(c => c.type === 'login');
  const loginUrl = employeeContact ? employeeContact.action_url : '/login';

  return <HeaderClient loginUrl={loginUrl} />;
}
