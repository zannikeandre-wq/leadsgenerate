import { KVNamespace } from '@cloudflare/workers-types';

export async function addLead(lead, KV) {
  const key = lead.email;
  await KV.put(key, JSON.stringify({ ...lead, status: 'new' }));
}

export async function getLeads(KV) {
  const list = await KV.list();
  const leads = [];
  for (const key of list.keys) {
    const value = await KV.get(key.name);
    leads.push(JSON.parse(value));
  }
  return leads;
}

export async function updateLeadStatus(email, status, KV) {
  const lead = await KV.get(email, { type: 'json' });
  if (lead) {
    lead.status = status;
    await KV.put(email, JSON.stringify(lead));
  }
}
